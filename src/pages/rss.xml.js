import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const collection = await getCollection('blog');
  const posts = collection
    .filter(({ data: { draft = false } }) => !draft)
    .sort(({ data: { date: dateA } }, { data: { date: dateB } }) => dateB.valueOf() - dateA.valueOf());
  return rss({
    title: SITE_TITLE,
    description: `${SITE_DESCRIPTION} feedId:52340201851637784+userId:55812696340985856`,
    site: context.site,
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => {
      const { tldr = '', date } = post.data;
      return {
        ...post.data,
        pubDate: date,
        description: tldr,
        link: `/blog/${post.slug}/`,
      };
    }),
  });
}
