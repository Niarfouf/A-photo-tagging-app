import LeaderBoard from '../components/LeaderBoard';
import useFetchData from '../hooks/useFetchData';
import { Link } from 'react-router-dom';
import styles from './LeaderBoardPage.module.css';

export default function LeaderBoardPage() {
  const { data, error, loading } = useFetchData('games/scores');

  if (error)
    return (
      <div className="error-page">
        <p>Impossible to load scores...</p>
        <Link className="error-link" to="/home">
          Home
        </Link>
      </div>
    );
  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Leaderboard</h1>
      <div className={styles['leaderboard-container']}>
        {Object.entries(data).map((game, index) => {
          return <LeaderBoard key={index} game={game} />;
        })}
      </div>
    </main>
  );
}
