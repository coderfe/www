import React, { useState } from 'react';
import styled from 'styled-components';
import asideBg from '../../images/aside-bg.jpg';
import Emoji from '../emoji';
import Profile from '../profile';

const AsideWrapper = styled.div`
  @media (max-width: 1024px) {
    position: fixed;
    z-index: 10;
  }
`;

const AsideContainer = styled.div`
  height: 100vh;
  background: url(${asideBg}) no-repeat;
  background-size: cover;
  transition: var(--base-transition);

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    width: 410px;
    box-shadow: 3px 0 12px 6px rgba(0, 0, 0, 0.2);

    &.open {
      left: 0;
    }

    &.close {
      left: -420px;
    }
  }

  @media (max-width: 447px) {
    width: 100%;

    &.close {
      left: -110%;
    }
  }
`;

const AsideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  @media (max-width: 1024px) {
    position: absolute;
  }
`;

const AsideTrigger = styled.div`
  display: none;
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 82;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
  font-size: 1.6rem;
  user-select: none;
  cursor: pointer;
  background-color: white;
  box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.2);
  transition: var(--base-transition);

  :hover {
    background-color: #f2f2f2;
  }

  @media (max-width: 1024px) {
    display: block;
  }
`;

export default function Aside() {
  const [toggle, setToggle] = useState(false);

  const className = [toggle ? 'open' : 'close'];

  return (
    <AsideWrapper>
      <AsideTrigger onClick={() => setToggle(!toggle)}>
        <Emoji label="菜单" emoji={toggle ? '❌' : '⭕️'} />
      </AsideTrigger>

      <AsideContainer className={className}>
        <AsideContent>
          <Profile />
        </AsideContent>
      </AsideContainer>
    </AsideWrapper>
  );
}
