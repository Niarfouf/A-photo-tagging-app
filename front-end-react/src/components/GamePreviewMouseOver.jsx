import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function GamePreviewMouseOver({ hover, game, click }) {
  const href = `/game/${game.game_id}`;
  return (
    <>
      <div className={hover ? 'hover-div visible' : 'hover-div'}>
        <p>Find all following characters to win : </p>
        <div className="target-container">
          {game.objects.map((object) => {
            return (
              <div key={object.object_id} className="target">
                <img
                  className="img-round"
                  src={object.image_ref}
                  alt={object.name}
                ></img>
                <h3>{object.name}</h3>
              </div>
            );
          })}
        </div>
        {!click ? (
          <Link className="start-btn" to={href}>
            Chose game
          </Link>
        ) : (
          <button className="start-btn" onClick={click}>
            Start
          </button>
        )}
      </div>
    </>
  );
}
GamePreviewMouseOver.propTypes = {
  hover: PropTypes.bool.isRequired,
  game: PropTypes.object.isRequired,
  click: PropTypes.func,
};
GamePreviewMouseOver.defaultProps = {
  click: null,
};
