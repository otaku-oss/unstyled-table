import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ServerTable from './pages/ServerTable';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/server-table',
    element: <ServerTable />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
