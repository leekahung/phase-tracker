import { createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import Member from './pages/Member/Member';
import About from './pages/About/About';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/member/:memberHandle',
        element: <Member />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
