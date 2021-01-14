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

    li {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.5rem;
    }
`;

const ProductTitle = styled(Link)`
`;

const ProductDescription = styled.p`
  margin-bottom: auto;
`;

const ProductImage = styled(Img)`
  height: 10rem;
`;

const ProductFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  p {
    margin: 0;
  }
  button {
    border: 0;
    background: lightgreen;
    border-radius: 15px;
  }
`;

export default function Browse({ data }) {
    const products = data.allStrapiProduct.nodes.map(product => {
        return {
            id: product.id,
            price: product.price,
            slug: product.slug,
            title: product.title,
            url: `/product/${product.slug}`,
            description: product.description,
            img: product.image.childImageSharp.fluid,
        }
    });

    return (
        <Layout>
            <SEO title="Snail in the Mail" />
            <Snipcart/>
            <SectionTag className="products">
                <ProductList className="products-list">
                    { products.map(product => (
                        <li key={product.id}>
                            <ProductTitle to={product.url}><h3>{product.title}</h3></ProductTitle>
                            <ProductDescription>{product.description}</ProductDescription>
                            <Link to={product.url}><ProductImage fluid={product.img} /></Link>
                            <ProductFooter>
                              <p>${Number.parseInt(product.price).toFixed(2)}</p>
                              <SnipButton product={product} />
                            </ProductFooter>
                        </li>
                    ))}
                </ProductList>
            </SectionTag>
        </Layout>
    );
};

export const query = graphql`{
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