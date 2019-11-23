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
          <Link to="/">
            <span role="img" aria-label="首页">
              🏡
            </span>
            首页
          </Link>
          <Link to="/books">
            <span role="img" aria-label="书单">
              📚
            </span>
            书单
          </Link>
          <Link to="/year">
            <span role="img" aria-label="书单">
              📆
            </span>
            年复一年
          </Link>
        </div>
        <Divider />
      </header>
    );
  }
}

export default Header;
