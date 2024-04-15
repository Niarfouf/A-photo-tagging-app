import formatTime from '../helperFunctions/formatTime';
import PropTypes from 'prop-types';
import styles from './GameScore.module.css';

export default function GameScore({ game }) {
  return (
    <>
      <div className={styles['game-score-container']}>
        <h2 className={styles['title-container']}>{game[0]}</h2>
        <div className={styles['score-container']}>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {game[1].map((score, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{score[0]}</td>
                    <td>{formatTime(score[1])}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
GameScore.propTypes = {
  game: PropTypes.array.isRequired,
};
