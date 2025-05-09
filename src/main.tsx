import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider
} from 'react-router';

import { Toaster } from '@/components/ui/sonner';
import Auth from '@/pages/Auth';
import City from '@/pages/City/City';
import Home from '@/pages/Home/Home';
import MainLayout from '@/pages/Layout/MainLayout';
import { useLocalStorage } from '@/shared/hooks';
import { getWeatherForecastCity } from '@/utils/api/requests/weather/forecast/city';
import AuthProvider from '@/utils/context/Auth/AuthProvider';
import { useAuthContext } from '@/utils/context/Auth/useAuthContext';
import { ThemeProvider } from '@/utils/context/Theme/theme-provider';

import Profile from './pages/Profile/Profile';

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
              { path: 'porno', Component: Home },
              {
                path: 'city/:cityName',
                Component: City,
                loader: async ({ params }) => {
                  if (!params.cityName) {
                    return;
                  }
                  const res = await getWeatherForecastCity(params.cityName, '1');
                  return { ...res };
                }
              },
              {
                path: 'profile',
                Component: Profile

              }
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
