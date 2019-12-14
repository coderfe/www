import { graphql } from 'gatsby';
import React from 'react';
import LineChart from '../components/chart/LineChart';
import WordCloud from '../components/chart/WorldCloud';
import Layout from '../components/layout';
import allCommitsJson from '../data/github.json';

export default function Year({ data }) {
  const { group: allBooks, distinct: allBookTags } = data.allBookJson;
  const { group: allMovie, distinct: allMovieTag } = data.allMovieJson;

  const books = queryBooks(allBooks);
  const lineChartData = groupByMonth(books);
  const wordCloudData = groupByTag(books, allBookTags);

  const movies = queryBooks(allMovie);
  const movieLineChartData = groupByMonth(movies);
  const movieWordCloudData = groupByTag(movies, allMovieTag);

  const year = new Date().getFullYear();

  return (
    <Layout seoTitle={'2019'} pageTitle={`break 2019; goto ${year};`}>
      {process.browser && (
        <>
          <LineChart
            data={lineChartData}
            cols={{
              month: {
                alias: '月份',
              },
              acc: {
                alias: '阅读量',
              },
            }}
          />

          <LineChart
            data={movieLineChartData}
            cols={{
              month: {
                alias: '月份',
              },
              acc: {
                alias: '阅片量',
              },
            }}
          />

          <LineChart
            data={allCommitsJson}
            cols={{
              month: {
                alias: '月份',
              },
              acc: {
                alias: 'commits',
              },
            }}
          />

          <WordCloud height={400} data={wordCloudData} />

          <WordCloud height={200} data={movieWordCloudData} />
        </>
      )}
    </Layout>
  );
}

export const pageQuery = graphql`
  query BooksChartQuery {
    allBookJson(
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
    allMovieJson(filter: { status: { eq: "collect" } }) {
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
