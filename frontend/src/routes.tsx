import { createBrowserRouter } from 'react-router-dom';
import { AppMiddlewares } from './AppMiddlewares';
import { AppProviders } from './AppProviders';
import { Login } from './pages/login';
import { Users } from './pages/users';
import { CreateUser } from './pages/users/create';
import { MainTemplate } from './templates/main';

export const Router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <AppMiddlewares />
      </AppProviders>
    ),
    children: [
      {
        element: <MainTemplate />,
        children: [
          {
            path: '/',
            element: <div>Home</div>,
          },
          {
            path: '/projects',
            element: <h2>projects</h2>,
          },
          {
            path: '/users',
            element: <Users />,
          },
          {
            path: '/create-users',
            element: <CreateUser />,
          },
          {
            path: '/settings',
            element: <h2>Settings</h2>,
          },
        ],
      },
      {
        element: <Login />,
        path: '/login',
      },
    ],
  },
]);
