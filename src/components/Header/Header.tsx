import { NavLink } from 'react-router';

import { useTheme } from '../../utils/context/Theme/theme-provider';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';

const Header = () => {
  const { setTheme, theme } = useTheme();

  return (

    <header className='flex justify-center py-4'>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='flex p-4 gap-5 items-center'>
                <li className=''><NavLink to='/'>Home</NavLink></li>
                <li className=''><NavLink to='/profile'>Profile</NavLink></li>
                <li><button type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}> Toggle theme</button></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
export default Header;
