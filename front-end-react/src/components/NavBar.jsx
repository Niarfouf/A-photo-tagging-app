import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatTime from '../helperFunctions/formatTime';
import styles from './NavBar.module.css';

export default function NavBar({ timerValue, selectedGame }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link className={styles.link} to="/home">
                Home
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>

        <section className={styles['target-header']}>
          <h2>Target :</h2>
          {selectedGame.objects.map((object) => {
            return (
              <img
                key={object.object_id}
                className={
                  selectedGame.found_objects.includes(object.object_id)
                    ? `${styles['img-round']} ${styles['found']}`
                    : styles['img-round']
                }
                src={object.image_ref}
                alt={object.name}
              ></img>
            );
          })}
        </section>

        <section className={styles.counter}>
          <h2>Time : {formatTime(timerValue)}</h2>
        </section>
      </header>
    </>
  );
}
NavBar.propTypes = {
  timerValue: PropTypes.number,
  selectedGame: PropTypes.object,
};
