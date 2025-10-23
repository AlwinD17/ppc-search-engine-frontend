import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../layout';
import { HomePage, SearchPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
    ],
  },
]);
