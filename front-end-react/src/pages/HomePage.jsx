import GamePreview from '../components/GamePreview';
import useFetchData from '../hooks/useFetchData';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
export default function HomePage() {
  const { data, error, loading } = useFetchData('games');

  if (error)
    return (
      <div className="error-page">
        <p>Impossible to load games...</p>
        <Link className="error-link" to="/home">
          Home
        </Link>
      </div>
    );
  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Choose a game</h1>
      <div className={styles['game-selection-container']}>
        {Object.entries(data).map((game) => {
          return <GamePreview key={game[0]} game={game[1]} />;
        })}
      </div>
    </main>
  );
}
