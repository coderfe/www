import { Link } from 'gatsby';
import React, { Component } from 'react';
import Divider from '../components/divider';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-searchbar" />
        <div className="header-logo">c:/d/d</div>
        <div className="header-navbar">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/about">About</Link>
        </div>
        <Divider />
      </header>
    );
  }
}

export default Header;
