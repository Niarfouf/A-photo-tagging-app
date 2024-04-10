import formatTime from '../helperFunctions/formatTime';
import PropTypes from 'prop-types';
export default function LeaderBoard({ game }) {
  return (
    <div className="game-score-container">
      <h2>{game[0]}</h2>
      {game[1].map((score, i) => {
        return (
          <p key={i}>
            {score[0]} : {formatTime(score[1])}
          </p>
        );
      })}
    </div>
  );
}
LeaderBoard.propTypes = {
  game: PropTypes.object.isRequired,
};
