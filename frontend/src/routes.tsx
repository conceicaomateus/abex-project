import { Outlet, createBrowserRouter } from 'react-router-dom';
import { AppMiddlewares } from './AppMiddlewares';
import { AppProviders } from './AppProviders';
import { AuthGuard, LoginRedirect } from './contexts/AuthContext';
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
        element: <AuthGuard entry={<Outlet />} fallback={<LoginRedirect />} />,
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
            ],
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
