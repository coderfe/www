import * as React from 'react';
import { FiGithub } from '@react-icons/all-files/fi/FiGithub';
import { FiTwitter } from '@react-icons/all-files/fi/FiTwitter';
import { FiRss } from '@react-icons/all-files/fi/FiRss';
import { IconContext } from '@react-icons/all-files';
import Container from './Container';

const Footer = function Footer() {
  const iconOptions = React.useMemo(() => ({ className: 'text-gray-500', size: '20px' }), []);

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
              value={iconOptions}
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
              value={iconOptions}
            >
              <FiTwitter />
            </IconContext.Provider>
          </a>
          <a
            title="Twitter"
            href="https://twitter.com/coderfee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconContext.Provider
              value={iconOptions}
            >
              <FiRss />
            </IconContext.Provider>
          </a>
        </div>

        <div>Copyright &copy; 2016-2021 coderfee, All rights reserved.</div>
      </Container>
    </div>
  );
};

export default Footer;
