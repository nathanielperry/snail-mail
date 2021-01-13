import React from "react";
import styled from 'styled-components';
import { Link, graphql } from "gatsby";

import Img from 'gatsby-image';
import Layout from "../components/layout";
import SEO from "../components/seo";
import Snipcart from "../components/snipcart";
import SnipButton from "../components/snip-button";

const SectionTag = styled.section`
  padding: 2rem;

  &.products {
    padding: 2rem;
    background: seagreen;
  }
`;

const ProductList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    list-style: none;
    margin: 0;
`;

export default function Browse({ data }) {
    const bugs = data.allStrapiProduct.nodes.map(bug => {
        return {
            id: bug.id,
            price: bug.price,
            slug: bug.slug,
            title: bug.title,
            url: `/product/${bug.slug}`,
            description: bug.description,
            img: bug.image.childImageSharp.fluid,
        }
    });

    return (
        <Layout>
            <SEO title="Snail in the Mail" />
            <Snipcart/>
            <SectionTag className="products">
                <ProductList className="bugs">
                    { bugs.map(bug => (
                        <li key={bug.id}>
                            <Link to={bug.url}><h3>{bug.title}</h3></Link>
                            <p>{bug.description}</p>
                            <Link to={bug.url}><Img fluid={bug.img} /></Link>
                            <p>${Number.parseInt(bug.price).toFixed(2)}</p>
                        </li>
                    ))}
                </ProductList>
            </SectionTag>
        </Layout>
    );
};

export const query = graphql`
  {
    allStrapiProduct(limit: 10) {
      nodes {
        id
        price
        slug
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`