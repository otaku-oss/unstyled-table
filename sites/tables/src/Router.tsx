import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import ServersidePagination from './pages/ServersidePagination';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'serverside-pagination',
        element: <ServersidePagination />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
