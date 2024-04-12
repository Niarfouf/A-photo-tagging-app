import PropTypes from 'prop-types';
import styles from './GamePopup.module.css';
export default function GamePopup({
  hidden,
  positionStyleZone,
  positionStyleDropdown,
  handleSelect,
  game,
}) {
  return (
    <>
      <div
        className={
          hidden ? `${styles['zone']} ${styles['hidden']}` : styles['zone']
        }
        style={positionStyleZone}
      ></div>
      <div
        className={
          hidden
            ? `${styles['dropdown']} ${styles['hidden']}`
            : styles['dropdown']
        }
        style={{
          top: positionStyleDropdown.top,
          left: positionStyleDropdown.left,
        }}
      >
        {game.objects.map((object) => {
          return (
            <button
              key={object.object_id}
              className={styles['img-btn']}
              onClick={handleSelect}
            >
              <img
                className={
                  game.found_objects.includes(object.object_id)
                    ? `${styles['img-round']} ${styles['found']}`
                    : styles['img-round']
                }
                name={object.object_id}
                src={object.image_ref}
              ></img>
            </button>
          );
        })}
      </div>
    </>
  );
}
GamePopup.propTypes = {
  game: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
  positionStyleZone: PropTypes.object.isRequired,
  positionStyleDropdown: PropTypes.object.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
