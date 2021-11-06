import * as React from 'react'
import { FiHome } from '@react-icons/all-files/fi/FiHome'

const NotFoundPage = () => {
  return (
    <main className="h-screen flex justify-center items-center">
      <a className="hover:outline-none" href="/">
        <FiHome size="100" />
      </a>
    </main>
  )
}

export default NotFoundPage
