import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/seo';
import Book from '../components/book';

export default function BooksPage({ data }) {
  const [collect, dos, wish] = data.allBookJson.group;

  const [tab, setTab] = useState('collect');

  const allBooks = [
    {
      status: 'collect',
      books: collect.nodes,
      name: '读过',
    },
    {
      status: 'do',
      books: dos.nodes,
      name: '在读',
    },
    {
      status: 'wish',
      books: wish.nodes,
      name: '想读',
    },
  ];

  return (
    <Layout>
      <SEO title="书单" description="书单" />
      <div className="books">
        <div style={{ textAlign: 'left' }}>
          <div className="books-btn-group">
            {allBooks.map(({ books, status, name }, index) => (
              <button
                onClick={() => setTab(status)}
                key={index}
                className={`btn ${tab === status ? 'btn__active' : ''}`}
              >
                {name}
                &nbsp;&bull;&nbsp;
                {books.length}
              </button>
            ))}
          </div>
        </div>
        <div>
          {allBooks.map(({ books, status }, index) => (
            <div className={`books-wrapper books-${status} ${tab === status ? 'active' : ''}`} key={index}>
              {books.map(book => (
                <div className="book-container" key={book.id}>
                  <Book key={book.id} book={book} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BooksQuery {
    allBookJson {
      group(field: status) {
        nodes {
          author
          date(formatString: "YYYY-MM-DD")
          image
          id
          status
          tags
          title
          url
        }
      }
    }
  }
`;
