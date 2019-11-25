import { Link } from 'gatsby';
import React, { Component } from 'react';
import Divider from '../components/divider';
import Emoji from '../components/emoji';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header-searchbar" />
        <div className="header-logo">c:/d/d</div>
        <div className="header-navbar">
          <Link to="/">
            <Emoji label="首页" emoji="🏡">
              首页
            </Emoji>
          </Link>
          <Link to="/books">
            <Emoji label="书单" emoji="📚">
              书单
            </Emoji>
          </Link>
          <Link to="/year">
            <Emoji label="年复一年" emoji="📆">
              年复一年
            </Emoji>
          </Link>
        </div>
        <Divider />
      </header>
    );
  }
}

export default Header;
