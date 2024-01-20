import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import ErrorPage from '../views/error-page/error-page';
import LandingPage from '../views/landing-page/landing-page';
import ProfilePage from '../views/profile-page/profile-page';
import ShapeSnap from '../views/games/shape-game-one/shape-snap';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/home",
          element: <LandingPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/games/shape-snap",
          element: <ShapeSnap />,
        },
      ],
    },
  ]);