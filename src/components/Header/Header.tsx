import { NavLink } from 'react-router';
import { toast } from 'sonner';

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
                <li className=''>
                  <NavLink to='/'>Home</NavLink>
                </li>
                <li className='flex items-center w-[80px] h-[80px] p-2 justify-center select-none rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md'>
                  <button
                    type='button'
                    onClick={() =>
                      toast('Event has been created', {
                        description: 'Sunday, December 03, 2023 at 9:00 AM',
                        action: {
                          label: 'Undo',
                          onClick: () => console.log('Undo')
                        },
                        style: {
                          border: '2px solid green'
                        }
                      })
                    }
                  >
                    Show Toast
                  </button>
                </li>
                <li><NavLink to='/auth'>Auth</NavLink></li>
                <li><button type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}> Toggle theme</button></li>
                <li className='border-2 border-green-500 hidden'></li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
export default Header;
