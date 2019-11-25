import React from 'react';

export default function Emoji({ label, emoji, children }) {
  return (
    <span className="emoji">
      <span className="emoji-icon" role="img" aria-label={label}>
        {emoji}
      </span>
      {children && <span className="emoji-label">{children}</span>}
    </span>
  );
}
