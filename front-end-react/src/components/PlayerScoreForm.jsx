import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import formatTime from '../helperFunctions/formatTime';
export default function PlayerScoreForm({ finalScore, game_id }) {
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState(null);
  const [isScoreSaved, setIsScoreSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/games/${game_id}/score`, {
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
      <div className="popup-score">
        <h2>Score : {formatTime(finalScore)}</h2>
        {!isScoreSaved && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="player">Enter your name :</label>
            <input
              type="text"
              id="player"
              name="player"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            ></input>
            <button type="submit">Save</button>
          </form>
        )}

        {message && <p>{message}</p>}

        {isScoreSaved && (
          <Link className="link" to="/home">
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
