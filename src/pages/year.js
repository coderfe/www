import { graphql } from 'gatsby';
import React from 'react';
import WordCloud from '../components/chart/WorldCloud';
import Layout from '../components/layout';

import allMoviesJson from '../data/movies.json';

console.log(allMoviesJson);

let bizcharts;

if (process.browser) {
  bizcharts = require('bizcharts');
}

export default function Year({ data }) {
  const { group: allBooks, distinct: allTags } = data.allBooksJson;

  const books = queryBooks(allBooks);
  const lineChartData = groupByMonth(books);
  const wordCloudData = groupByTag(books, allTags);

  const cols = {
    month: {
      alias: '月份',
    },
    acc: {
      alias: '阅读量',
    },
  };

  const year = new Date().getFullYear();

  return (
    <Layout seoTitle={'2019'} pageTitle={`${year}`}>
      {process.browser && (
        <>
          <bizcharts.Chart
            height={400}
            data={lineChartData}
            scale={cols}
            forceFit
          >
            <bizcharts.Axis
              name="month"
              title={null}
              tickLine={null}
              line={{
                stroke: '#E6E6E6',
              }}
            />
            <bizcharts.Axis
              name="acc"
              line={false}
              tickLine={null}
              grid={null}
              title={null}
            />
            <bizcharts.Tooltip />
            <bizcharts.Geom
              type="line"
              position="month*acc"
              size={2}
              color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1)
            1:rgba(215, 0, 255, 1)"
              shape="smooth"
              style={{
                shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
                shadowBlur: 60,
                shadowOffsetY: 6,
              }}
            />
          </bizcharts.Chart>

          <WordCloud data={wordCloudData} />

          <WordCloud data={allMoviesJson} width={500} height={500} />
        </>
      )}
    </Layout>
  );
}

export const pageQuery = graphql`
  query BooksChartQuery {
    allBooksJson(
      filter: { date: { gt: "2019-01-01" }, status: { eq: "collect" } }
    ) {
      group(field: date) {
        nodes {
          title
          tags
          date(formatString: "YYYY-MM")
        }
      }
      distinct(field: tags)
    }
  }
`;

function groupByMonth(books) {
  const months = Array.from(new Set(books.map(b => b.date)));

  return months.map(month => ({
    month: month,
    acc: books.filter(book => book.date === month).length,
  }));
}

function groupByTag(books, allTags) {
  return allTags.map(tag => {
    const count = books.filter(book => book.tags.includes(tag)).length;
    return {
      x: tag,
      value: count,
      category: tag,
    };
  });
}

function queryBooks(edges) {
  return edges
    .map(edge => edge.nodes)
    .reduce((prev, acc) => {
      return prev.concat(acc);
    }, []);
}
