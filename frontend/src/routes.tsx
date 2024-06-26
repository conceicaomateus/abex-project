import { Outlet, createBrowserRouter } from 'react-router-dom';
import { AppMiddlewares } from './AppMiddlewares';
import { AppProviders } from './AppProviders';
import { AuthGuard, LoginRedirect } from './contexts/AuthContext';
import { Redirect } from './helpers/redirect';
import { Login } from './pages/login';
import { ProjectPage } from './pages/project';
import { ProjectManagerPage } from './pages/project-manager';
import { StudentPage } from './pages/student';
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
                path: '/projetos',
                element: <ProjectPage />,
              },
              {
                path: '/estudantes',
                element: <StudentPage />,
              },
              {
                path: '/gerente-projetos',
                element: <ProjectManagerPage />,
              },
            ],
          },
        ],
      },
      {
        element: <Login />,
        path: '/login',
      },
      {
        path: '/',
        element: <Redirect />,
      },
    ],
  },
]);
