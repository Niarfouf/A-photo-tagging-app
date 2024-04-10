import { useParams, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import Game from '../components/Game';
import GamePreview from '../components/GamePreview';
import useFetchData from '../hooks/useFetchData';
export default function GamePage() {
  const { gameId } = useParams();
  const { data, error, loading } = useFetchData('games/' + gameId);

  const [
    selectedGame,
    setSelectedGame,
    isGameStarted,
    startGame,
    resetGame,
    handleFoundObject,
    finalScore,
  ] = useOutletContext();

  useEffect(() => {
    if (data) {
      const game = { ...data };
      game.found_objects = [];
      setSelectedGame(game);
    }

    return () => resetGame();
  }, [data, setSelectedGame, resetGame]);

  const handleStart = () => {
    fetch(`http://localhost:3000/games/${gameId}/start`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
      })
      .then(() => {
        startGame();
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (error)
    return (
      <p>
        A network error was encountered or you tried to access a non-existing
        game.
      </p>
    );

  if (loading) return <p>Loading...</p>;

  if (!isGameStarted) return <GamePreview game={data} click={handleStart} />;

  return (
    <>
      <Game
        game={selectedGame}
        handleFoundObject={handleFoundObject}
        finalScore={finalScore}
      />
    </>
  );
}
