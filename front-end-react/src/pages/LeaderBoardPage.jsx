import LeaderBoard from '../components/LeaderBoard';
import useFetchData from '../hooks/useFetchData';
export default function LeaderBoardPage() {
  const { data, error, loading } = useFetchData('games/scores');

  if (error) return <p>A network error was encountered</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <main className="leaderboard">
      <h1>Leaderboard</h1>
      {Object.entries(data).map((game, index) => {
        return <LeaderBoard key={index} game={game} />;
      })}
    </main>
  );
}
