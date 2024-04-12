import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './GamePreviewMouseOver.module.css';

export default function GamePreviewMouseOver({ hover, game, click }) {
  const href = `/game/${game.game_id}`;
  return (
    <>
      <div
        className={
          hover
            ? `${styles['hover-div']} ${styles['visible']}`
            : styles['hover-div']
        }
      >
        <p>Find all following characters to win : </p>
        <div className={styles['target-container']}>
          {game.objects.map((object) => {
            return (
              <div key={object.object_id} className={styles.target}>
                <img
                  className={styles['img-round']}
                  src={object.image_ref}
                  alt={object.name}
                ></img>
                <h3>{object.name}</h3>
              </div>
            );
          })}
        </div>
        {!click ? (
          <Link className={styles['start-btn']} to={href}>
            Choose game
          </Link>
        ) : (
          <button className={styles['start-btn']} onClick={click}>
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
