import { createBrowserRouter } from 'react-router-dom';
import App from '../App'
import ErrorPage from '../views/error-page/error-page';
import LandingPage from '../views/landing-page/landing-page';
import ProfilePage from '../views/profile-page/profile-page';
import ShapeSnap from '../views/games/shape-snap/shape-snap';
import UserPage from '../views/user-page/user-page';
import { Navbar } from '../components/navbar';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "home",
          element: <LandingPage />,
        },
        {
          path: "login",
          element: <UserPage />,
        },
        {
          path: "register",
          element: <UserPage />,
        },
        {
          path: "register-child",
          element: <UserPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "games/shape-snap",
          element: <ShapeSnap />,
        },
      ],
    },
  ]);