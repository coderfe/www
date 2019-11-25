import React from 'react';
import styled from 'styled-components';

const EmojiWrapper = styled.span`
  display: inline-block;
`;

const EmojiIcon = styled.span`
  position: relative;
  top: 1px;
`;

const EmojiLabel = styled.span`
  display: inline-block;
  margin-left: 5px;
`;

export default function Emoji({ label, emoji, children }) {
  return (
    <EmojiWrapper>
      <EmojiIcon role="img" aria-label={label}>
        {emoji}
      </EmojiIcon>
      {children && <EmojiLabel>{children}</EmojiLabel>}
    </EmojiWrapper>
  );
}
