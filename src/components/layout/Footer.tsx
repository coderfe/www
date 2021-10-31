import * as React from 'react'
import Container from './Container'

export default function Footer() {
  return (
    <div className="border-t border-gray-300 dark:border-gray-900 dark:bg-gray-900">
      <Container className="p-3 text-center text-xs text-gray-500 space-y-2">
        <div>Copyright &copy; 2016-2021 coderfee, All rights reserved.</div>
        <div>🧑‍💻</div>
      </Container>
    </div>
  )
}
