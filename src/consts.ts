export const SITE_TITLE = "coderfee's blog";
export const AUTHOR = "coderfee";
export const SITE_DESCRIPTION =
  "coderfee's blog 是一个关于编程、AI 应用、读书笔记和个人随笔的博客。一起探索编程之美、AI 之智、读书之乐和写作之趣吧！";

export type Social = {
  name: string;
  url: string;
  icon: string;
  color: string;
};

export const socials: Social[] = [
  {
    name: 'Github',
    url: 'https://github.com/coderfe',
    icon: 'brand-github',
    color: '#6cc644',
  },
  {
    name: 'X',
    url: 'https://x.com/oxproto55071',
    icon: 'brand-twitter',
    color: '#14171a',
  },
  {
    name: 'Email',
    url: 'mailto:coderfee@outlook.com',
    icon: 'mail',
    color: '#4285f4',
  },
  {
    name: 'RSS',
    url: '/rss.xml',
    icon: 'rss',
    color: '#f26522',
  },
  {
    name: 'Blog',
    url: '/blog',
    icon: 'home',
    color: '#404041',
  },
];
