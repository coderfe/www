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
    <div className="h-screen flex flex-col tracking-wide transition-colors duration-75 dark:bg-gray-800 dark:text-gray-50">
      <header className="flex-none">
        <Header />
      </header>

      <main className="flex-grow overflow-auto">
        {children}

        <footer className="flex-none">
          <Footer />
        </footer>
      </main>
    </div>
  )
}
