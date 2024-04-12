import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import useTimer from './hooks/useTimer';
import imgUrl from './src/assets/object.png';
import './App.css';
const defaultGame = {
  objects: [
    {
      name: 'Unknown',
      image_ref: imgUrl,
      object_id: 1,
      game: 'Unknown',
    },
    {
      name: 'Unknown',
      image_ref: imgUrl,
      object_id: 2,
      game: 'Unknown',
    },
    {
      name: 'Unknown',
      image_ref: imgUrl,
      object_id: 3,
      game: 'Unknown',
    },
  ],
  found_objects: [],
};
export default function App() {
  const [selectedGame, setSelectedGame] = useState(defaultGame);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState(null);
  const { timerValue, startTimer, pauseTimer, resetTimer } = useTimer(100);

  if (isGameOver && finalScore !== timerValue) {
    setFinalScore(timerValue);
  }
  const startGame = useCallback(() => {
    setIsGameStarted(true);
    startTimer();
  }, [startTimer]);

  const resetGame = useCallback(() => {
    setIsGameStarted(false);
    setSelectedGame(defaultGame);
    setIsGameOver(false);
    resetTimer();
    setFinalScore(null);
  }, [resetTimer]);

  const handleFoundObject = useCallback(
    (objectId) => {
      setSelectedGame((oldSelectedGame) => {
        const newSelectedGame = { ...oldSelectedGame };
        if (!newSelectedGame.found_objects.includes(objectId)) {
          newSelectedGame.found_objects.push(objectId);
        }

        if (
          newSelectedGame.found_objects.length ===
          newSelectedGame.objects.length
        ) {
          pauseTimer();
          setIsGameOver(true);
        }
        return newSelectedGame;
      });
    },
    [pauseTimer],
  );

  return (
    <>
      <NavBar timerValue={timerValue} selectedGame={selectedGame} />

      <Outlet
        context={[
          selectedGame,
          setSelectedGame,
          isGameStarted,
          startGame,
          resetGame,
          handleFoundObject,
          finalScore,
        ]}
      />
    </>
  );
}
