export const SITE_TITLE = "Coderfee's Blog";
export const SITE_DESCRIPTION =
  "Coderfee'Blog 是一个关于编程、AI 应用、读书笔记和个人随笔的博客。一起探索编程之美、AI 之智、读书之乐和写作之趣吧！";

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
    name: 'Twitter',
    url: 'https://twitter.com/coderfee',
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
