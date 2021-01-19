import React from "react";
import { graphql } from "gatsby";
import styled from 'styled-components';

import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from '../components/seo';
import SnipButton from '../components/snip-button';

const SectionTag = styled.section`
  padding: 2rem;
  height: 100vh;
  background: seagreen;
  display: flex;
  justify-content: center;
  
  &.product {
      display: flex;
      justify-content: space-between;
      margin: auto;
  }
`;

export default function Product ({ data }) {
    const product = {
        ...data.strapiProduct,
        url: `/product/${data.strapiProduct.slug}`,
        img: data.strapiProduct.image.childImageSharp.fluid,
    };

    return (
        <Layout>
            <SEO 
                title={product.title}
                description={product.description}
            />
            <SectionTag>
                <div className="product snipcart-add-item">
                    <div className="info">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <Img fluid={product.img} />
                        <p>${Number.parseInt(product.price).toFixed(2)}</p>
                        <SnipButton product={product} />
                    </div>
                </div>
            </SectionTag>
        </Layout>
    )
}

export const query = graphql`query ProductQuery($slug: String!) {
    strapiProduct(slug: { eq: $slug }, status: { eq: "published" })  {
        id
        slug
        title
        description
        price
        created_at
        dimension
        medium
        categories {
            name
        }
        image {
            childImageSharp {
                fluid(maxWidth: 300) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
}`;