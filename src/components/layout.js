/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from 'styled-components';
import Header from "./header";
import "./layout.css";

const FooterTag = styled.footer`
  padding: 1rem;
`;

const Layout = ({ isHomePage, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header 
        siteTitle={data.site.siteMetadata?.title || `Title`}
        isHomePage={isHomePage}
      />
      <div>
        <main>{children}</main>
        <FooterTag>
          © {new Date().getFullYear()}
        </FooterTag>
      </div>
    </>
  )
}

export default Layout;
