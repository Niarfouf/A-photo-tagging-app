import App from './App';
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import GamePage from './pages/GamePage';
import Error from './Error';
import NotFoundPage from './pages/NotFoundPage';
import { Navigate } from 'react-router-dom';
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/home" replace /> },
          {
            path: 'home',
            element: <HomePage />,
          },
          { path: 'leaderboard', element: <LeaderBoardPage /> },
          { path: 'game', element: <Navigate to="/home" replace /> },
          { path: 'game/:gameid', element: <GamePage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];

export default routes;
