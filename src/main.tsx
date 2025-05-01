import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  redirect,
  RouterProvider,
  useNavigate
} from 'react-router';

import Auth from '@/components/pages/Auth';
import MainLayout from '@/components/pages/Layout/MainLayout';

import Home from './components/pages/Home/Home';
import { Toaster } from './components/ui/sonner';
import { useLocalStorage } from './shared/hooks';
import AuthProvider from './utils/context/Auth/AuthProvider';
import { useAuthContext } from './utils/context/Auth/useAuthContext';
import { ThemeProvider } from './utils/context/Theme/theme-provider';

import './index.css';

const Layout = () => {
  return (
    <><Outlet /><Toaster /></>
  );
};
const GuardRoute = () => {
  const { user, setUser: _ } = useAuthContext();
  const { value } = useLocalStorage('user', user);
  console.log(user);
  return (
    value ? <Outlet></Outlet> : <Navigate to='/auth'></Navigate>
  );
};
const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: 'auth', Component: Auth },
      {
        Component: GuardRoute,
        children: [
          {
            path: '/',
            Component: MainLayout,
            children: [
              { index: true, Component: Home },
              { path: 'porno', Component: Home }
            ]
          }
        ]
      }
    ]
  }
]);
createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </ThemeProvider>

);
