import React from "react";
import { Link } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/layout";
import SEO from "../components/seo";

const SectionTag = styled.section`
  padding: 2rem;

  &.splash {
    height: 50vh;
    background: seagreen;
  }

  &.content {
    background: burlywood;
    display: flex;
    justify-content: space-around;
    height: 50vh;
  }
`;

const IndexPage = ({ location }) => (
  <Layout isHomePage={location.pathname === '/'}>
    <SEO title="Snail in the Mail" />
    <SectionTag className="splash">
      <h1>Snail in the Mail</h1>
    </SectionTag>
    <SectionTag className="content">
      <article className="browse-cta">
        <h2>Browse Our Art</h2>
        <Link to="/browse">Show Me Some Bugs</Link>
      </article>
      <article className="commision-cta">
        <h2>Commissions</h2>
        <Link to="/commissions">Send Us a Request</Link>
      </article>
    </SectionTag>
  </Layout>
)

export default IndexPage;
