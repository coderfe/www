import React, { useState } from 'react';
import Profile from '../profile';
import Emoji from '../emoji';

export default function Aside() {
  const [toggle, setToggle] = useState(false);

  const classnames = ['aside', toggle ? 'active' : ''].join(' ');

  return (
    <aside className={classnames}>
      <div className="aside-toggle" onClick={() => setToggle(!toggle)}>
        <Emoji label="菜单" emoji={toggle ? '❌' : '⭕️'} />
      </div>
      <div className="aside-effect" />
      <div className="aside-content">
        <Profile />
      </div>
    </aside>
  );
}
