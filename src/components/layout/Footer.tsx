import * as React from 'react'
import Container from './Container'
import { FiGithub } from '@react-icons/all-files/fi/FiGithub'
import { FiTwitter } from '@react-icons/all-files/fi/FiTwitter'
import { IconContext } from '@react-icons/all-files'

export default function Footer() {
  return (
    <div className="border-t border-gray-300 dark:border-gray-900 dark:bg-gray-900">
      <Container className="p-3 text-center text-xs text-gray-500 space-y-2">
        <div className="space-x-5">
          <a
            title="GitHub"
            href="https://github.com/coderfe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContext.Provider
              value={{ className: 'text-gray-500', size: '20px' }}
            >
              <FiGithub />
            </IconContext.Provider>
          </a>
          <a
            title="Twitter"
            href="https://twitter.com/coderfee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContext.Provider
              value={{ className: 'text-gray-500 ', size: '20px' }}
            >
              <FiTwitter />
            </IconContext.Provider>
          </a>
        </div>

        <div>Copyright &copy; 2016-2021 coderfee, All rights reserved.</div>
      </Container>
    </div>
  )
}
