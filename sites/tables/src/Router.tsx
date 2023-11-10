import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Home';
import FullyControlled from './pages/FullyControlled';
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
        path: 'fully-controlled',
        element: <FullyControlled />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
