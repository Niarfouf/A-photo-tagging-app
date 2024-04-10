import PropTypes from 'prop-types';

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
        className={hidden ? 'zone hidden' : 'zone'}
        style={positionStyleZone}
      ></div>
      <div
        className={hidden ? 'dropdown hidden' : 'dropdown'}
        style={{
          top: positionStyleDropdown.top,
          left: positionStyleDropdown.left,
        }}
      >
        {game.objects.map((object) => {
          return (
            <button
              key={object.object_id}
              className="img-btn"
              onClick={handleSelect}
            >
              <img
                className={
                  game.found_objects.includes(object.object_id)
                    ? 'img-round found'
                    : 'img-round'
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
