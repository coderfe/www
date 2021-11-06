import React from 'react'
import useDarkMode from 'use-dark-mode'
import Footer from './Footer'
import Header from './Header'

export const Layout: React.FC = ({ children }) => {
  let systemMode = false
  if (typeof window !== 'undefined' && document) {
    systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    useDarkMode(systemMode, {
      classNameLight: 'light',
      classNameDark: 'dark',
      element: document.documentElement,
    })
  }

  return (
    <div className="tracking-wide transition-colors duration-75 dark:bg-gray-800 dark:text-gray-50">
      <header className="sticky top-0 left-0 right-0 z-100 bg-[hsla(0,0%,100%,0.3)] backdrop-filter backdrop-blur-sm dark:bg-[hsla(221,39%,11%,0.3)]">
        <Header />
      </header>

      <main>
        {children}

        <footer>
          <Footer />
        </footer>
      </main>
    </div>
  )
}
