import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatTime from '../helperFunctions/formatTime';
import styles from './PlayerScoreForm.module.css';
export default function PlayerScoreForm({ finalScore, game_id }) {
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState(null);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://gentle-wax-tamarillo.glitch.me/games/${game_id}/score`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ player: playerName, finalScore }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => {
        setMessage(response.message);
        if (response.score) {
          setIsScoreSaved(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <>
      <div className={styles['popup-score']}>
        <h2>You win !</h2>
        <p>Score : {formatTime(finalScore)}</p>
        {!isScoreSaved && (
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <label htmlFor="player">Enter your name :</label>
              <input
                type="text"
                id="player"
                name="player"
                value={playerName}
                autoComplete="off"
                autoFocus
                onChange={(e) => setPlayerName(e.target.value)}
              ></input>
            </div>
            <button className={styles.btn} type="submit">
              Save
            </button>
          </form>
        )}

        {message && <p>{message}</p>}

        {isScoreSaved && (
          <Link className={styles.btn} to="/home">
            Home
          </Link>
        )}
      </div>
    </>
  );
}
PlayerScoreForm.propTypes = {
  finalScore: PropTypes.number.isRequired,
  game_id: PropTypes.number.isRequired,
};
