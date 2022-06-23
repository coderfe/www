import { Link } from 'gatsby';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useLocalStorage, useMedia } from 'react-use';
import { FiMoon } from '@react-icons/all-files/fi/FiMoon';
import { FiSun } from '@react-icons/all-files/fi/FiSun';
import avatar from '../../images/icon.jpg';
import Icon from '../Icon';
import Container from './Container';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
];

type Props = {
  to: string;
};

const NavLink: React.FC<Props> = function NavLink({ to, children }) {
  return (
    <Link to={to} activeClassName="nav-link--active" className="nav-link">
      {children}
    </Link>
  );
};

function useColorTheme() {
  const systemPrefers = useMedia('(prefers-color-scheme: dark)');
  const [isDark, setIsDark] = useLocalStorage<boolean>('darkMode');

  const value = useMemo(() => (isDark === undefined ? systemPrefers : isDark), [isDark, systemPrefers]);

  useEffect(() => {
    if (value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [value]);

  return {
    isDark: value,
    setIsDark,
  };
}

const Header = function Header() {
  const { isDark, setIsDark } = useColorTheme();

  return (
    <div className="py-3 border-b border-gray-300 dark:border-gray-900">
      <Container
        className="
        h-full
        grid
        grid-row-2
        gap-3
        justify-center
        sm:grid-cols-2
        sm:grid-rows-none
        sm:justify-between
        sm:items-center"
      >
        <div className="flex items-center space-x-2 text-2xl">
          <div className="w-10 h-10 rounded-full overflow-hidden hover:shadow-md transition-shadow duration-500">
            <img src={avatar} alt="coderfee space logo" />
          </div>
          <Link
            to="/"
            className="text-gray-800 font-semibold hover:t transition-colors duration-500 dark:text-gray-100"
          >
            Coderfee Space
          </Link>
        </div>
        <div className="flex items-center justify-center space-x-3 text-center md:text-right md:justify-end">
          {routes.map((route) => (
            <NavLink key={route.path} to={route.path}>
              {route.name}
            </NavLink>
          ))}
          <button type="button" className="cursor-pointer select-none" onClick={() => setIsDark(!isDark)}>
            {isDark ? (
              <Icon iconOption={{ className: 'text-gray-300' }}>
                <FiMoon />
              </Icon>
            ) : (
              <Icon iconOption={{ className: 'text-gray-800' }}>
                <FiSun />
              </Icon>
            )}
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Header;
