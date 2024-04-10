import GamePopup from './GamePopup';
import PlayerScoreForm from './PlayerScoreForm';
import { useState, useRef, useCallback } from 'react';
import calculateCoordinate from '../helperFunctions/calculateCoordinate';
import PropTypes from 'prop-types';

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
            const left =
              (response.x_coord / 1000) * myRefImg.current.clientWidth;
            const top =
              (response.y_coord / 1000) * myRefImg.current.clientHeight;

            const newObject = {
              ...positionStyleObject,
              [index]: {
                top,
                left,
              },
            };

            setPositionStyleObject(newObject);
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
    [game, handleFoundObject, positionStyleObject, positionStyleZone],
  );

  return (
    <>
      <main ref={myRefMain}>
        <img
          ref={myRefImg}
          onClick={!finalScore ? handleClick : null}
          className="game-img"
          src={game.game_image_url}
        ></img>

        {game.found_objects.length > 0 &&
          game.found_objects.map((object) => {
            return (
              <div
                key={object}
                className="object"
                style={positionStyleObject[object]}
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
