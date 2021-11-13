import { Link } from 'gatsby';
import * as React from 'react';
import useDarkMode from 'use-dark-mode';
import Icon from '../../images/icon.jpg';
import Container from './Container';

const routes = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },
];

type Props = {
  to: string
}

const NavLink: React.FC<Props> = function NavLink({ to, children }) {
  return (
    <Link to={to} activeClassName="nav-link--active" className="nav-link">
      {children}
    </Link>
  );
};

const ThemeToggler = function ThemeToggler() {
  const { value, enable, disable } = useDarkMode();

  return (
    <button
      type="button"
      className="cursor-pointer select-none"
      onClick={value ? disable : enable}
    >
      {value ? '🌝' : '🌞'}
    </button>
  );
};

const Header = function Header() {
  return (
    <div className="py-3 border-b border-gray-300 dark:border-gray-900">
      <Container className="
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
            <img src={Icon} alt="coderfee space logo" />
          </div>
          <Link
            to="/"
            className="text-gray-800 font-semibold hover:t transition-colors duration-500 dark:text-gray-100"
          >
            Coderfee Space
          </Link>
        </div>
        <div className="space-x-5 text-center md:text-right">
          {routes.map((route) => (
            <NavLink key={route.path} to={route.path}>
              {route.name}
            </NavLink>
          ))}
          <ThemeToggler />
        </div>
      </Container>
    </div>
  );
};

export default Header;
