import GamePopup from './GamePopup';
import PlayerScoreForm from './PlayerScoreForm';
import { useState, useRef, useCallback, useEffect } from 'react';
import calculateCoordinate from '../helperFunctions/calculateCoordinate';
import PropTypes from 'prop-types';
import styles from './Game.module.css';

export default function Game({ game, handleFoundObject, finalScore }) {
  const [hidden, setHidden] = useState(true);
  const [positionStyleZone, setPositionStyleZone] = useState({});
  const [positionStyleDropdown, setPositionStyleDropdown] = useState({});
  const [positionStyleObject, setPositionStyleObject] = useState({});

  const myRefMain = useRef();
  const myRefImg = useRef();

  const handleClick = useCallback((event) => {
    setHidden((hidden) => {
      if (hidden) {
        const styleObject = calculateCoordinate(event, myRefMain, myRefImg);
        setPositionStyleZone(styleObject.styleZone);
        setPositionStyleDropdown(styleObject.styleDropdown);
        return false;
      } else {
        return true;
      }
    });
  }, []);

  const handleSelect = useCallback(
    (event) => {
      setHidden(true);
      const coordX =
        (positionStyleZone.left / myRefImg.current.clientWidth) * 1000;
      const coordY =
        (positionStyleZone.top / myRefImg.current.clientHeight) * 1000;
      fetch(
        `http://localhost:3000/games/${game.game_id}/check/${event.target.name}`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ coordX, coordY }),
        },
      )
        .then((response) => {
          if (response.status >= 400) {
            throw new Error('server error');
          }
          return response.json();
        })
        .then((response) => {
          if (response.foundCoord) {
            const index = parseInt(event.target.name);
            const leftFormatted = response.x_coord / 1000;
            const topFormatted = response.y_coord / 1000;
            const left = leftFormatted * myRefImg.current.clientWidth;
            const top = topFormatted * myRefImg.current.clientHeight;

            setPositionStyleObject((positionStyleObject) => {
              return {
                normal: {
                  ...positionStyleObject.normal,
                  [index]: {
                    top,
                    left,
                  },
                },
                formatted: {
                  ...positionStyleObject.formatted,
                  [index]: {
                    topFormatted,
                    leftFormatted,
                  },
                },
              };
            });

            handleFoundObject(index);
          }

          if (response.score) {
            window.scrollTo(0, 0);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    [game, handleFoundObject, positionStyleZone],
  );
  useEffect(() => {
    function handleResize() {
      if (positionStyleObject.formatted) {
        setPositionStyleObject((positionStyleObject) => {
          const newPositionStyleObject = {};
          Object.keys(positionStyleObject.normal).forEach((index) => {
            newPositionStyleObject[index] = {
              left:
                positionStyleObject.formatted[index].leftFormatted *
                myRefImg.current.clientWidth,
              top:
                positionStyleObject.formatted[index].topFormatted *
                myRefImg.current.clientHeight,
            };
          });
          return { ...positionStyleObject, normal: newPositionStyleObject };
        });
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [positionStyleObject]);
  return (
    <>
      <main ref={myRefMain}>
        <img
          ref={myRefImg}
          onClick={!finalScore ? handleClick : null}
          className={styles['game-img']}
          src={game.game_image_url}
        ></img>

        {game.found_objects.length > 0 &&
          game.found_objects.map((object) => {
            return (
              <div
                key={object}
                className={styles.object}
                style={positionStyleObject.normal[object]}
              ></div>
            );
          })}
        <GamePopup
          hidden={hidden}
          positionStyleZone={positionStyleZone}
          positionStyleDropdown={positionStyleDropdown}
          handleSelect={handleSelect}
          game={game}
        />
        {finalScore && (
          <PlayerScoreForm
            finalScore={finalScore}
            game_id={game.game_id}
          ></PlayerScoreForm>
        )}
      </main>
    </>
  );
}
Game.propTypes = {
  game: PropTypes.object.isRequired,
  handleFoundObject: PropTypes.func.isRequired,
  finalScore: PropTypes.number,
};
