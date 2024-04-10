import GamePreview from '../components/GamePreview';
import useFetchData from '../hooks/useFetchData';

export default function HomePage() {
  const { data, error, loading } = useFetchData('games');

  if (error) return <p>Impossible to load games...</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>Choose your image</h1>

      <main className="game-selection-container">
        {Object.entries(data).map((game) => {
          return <GamePreview key={game[0]} game={game[1]} />;
        })}
      </main>
    </>
  );
}
