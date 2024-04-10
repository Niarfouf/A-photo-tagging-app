import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatTime from '../helperFunctions/formatTime';
export default function NavBar({ timerValue, selectedGame }) {
  return (
    <>
      <header>
        <nav className="app-header">
          <ul>
            <li>
              <Link className="link" to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className="link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="game-header">
          <div className="target-header">
            <h2>Target :</h2>
            {selectedGame.objects.map((object) => {
              return (
                <img
                  key={object.object_id}
                  className={
                    selectedGame.found_objects.includes(object.object_id)
                      ? 'img-round found'
                      : 'img-round'
                  }
                  src={object.image_ref}
                  alt={object.name}
                ></img>
              );
            })}
          </div>
        </div>
        <div className="counter">
          <h2>Time {formatTime(timerValue)}</h2>
        </div>
      </header>
    </>
  );
}
NavBar.propTypes = {
  timerValue: PropTypes.number,
  selectedGame: PropTypes.object,
};
