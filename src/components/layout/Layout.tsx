import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC = function Layout({ children }) {
  return (
    <div className="tracking-wide transition-colors duration-500 dark:bg-gray-800 dark:text-gray-50">
      <header className="
        sticky
        top-0
        left-0
        right-0
        z-100
        bg-[hsla(0,0%,100%,0.3)]
        backdrop-filter
        backdrop-blur-sm
        dark:bg-[hsla(221,39%,11%,0.3)]"
      >
        <Header />
      </header>

      <main>
        {children}

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  );
};

export default Layout;
