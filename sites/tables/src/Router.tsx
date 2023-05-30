import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
