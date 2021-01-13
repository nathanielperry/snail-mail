import { Link } from "gatsby";
import styled from 'styled-components';
import React from "react";
import Image from './image';

const HeaderTag = styled.header`
  height: 4rem;
  display: flex;
  gap: 2rem;
  padding-left: 2rem;
  align-items: center;

  h1 {
    line-height: 4rem;
    vertical-align: center;
    margin: 0;
  }
`;

const Header = ({ siteTitle, isHomePage }) => (
  <HeaderTag>
      <Link to="/">
        <Image alt={siteTitle}/>
      </Link>
      { !isHomePage && <h1>{siteTitle}</h1>}
  </HeaderTag>
)

export default Header;
