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
    <SEO title="Snail Mail" />
    <SectionTag className="splash">
      <h1>Snail Mail</h1>
    </SectionTag>
    <SectionTag className="content">
      <article className="browse-cta">
        <h2>Browse Our Art</h2>
        <p>All of our paintings are one-of-a-kind and hand painted with love.</p> 
        <Link to="/browse">Show Me Some Bugs</Link>
      </article>
      <article className="commision-cta">
        <h2>Commissions</h2>
        <p>Got something specific in mind?</p>
        <Link to="/commissions">Send Us a Request</Link>
      </article>
    </SectionTag>
  </Layout>
)

export default IndexPage;
