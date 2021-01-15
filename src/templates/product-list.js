import React from "react";
import styled from 'styled-components';
import { Link, graphql } from "gatsby";

import Img from 'gatsby-image';
import Layout from "../components/layout";
import SEO from "../components/seo";
import SnipButton from "../components/snip-button";
import CategoryList from "../components/category-list";

const SectionTag = styled.section`
  padding: 2rem;

  &.products {
    padding: 2rem;
    background: seagreen;
  }
`;

const ProductListUl = styled.ul`
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

export default function ProductList({ data, pageContext }) {
    const { numPages, currentPage, category } = pageContext; 
    const baseUrl = category ? `/category/${category}/` : `/products/`;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage = currentPage - 1 === 1 ? baseUrl : (currentPage - 1).toString();
    const nextPage = (currentPage + 1).toString();

    const products = data.allStrapiProduct.nodes.map(product => {
        return {
            ...product,
            description: product.description,
            img: product.image.childImageSharp.fluid,
        }
    });

    const allCategories = data.allStrapiCategory.nodes;
    const usedCategoryNames = products.reduce((acc, cur) => {
        acc.push(...cur.categories.map(cat => cat.name));
        return acc;
      }, []).filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    ;
    const usedCategories = allCategories.filter(cat => {
        return usedCategoryNames.includes(cat.name);
    });

    return (
        <Layout>
            <SEO title="Snail in the Mail" />
            <SectionTag className="categories">
                <CategoryList categories={usedCategories} />
            </SectionTag>
            <SectionTag className="products">
                <ProductListUl className="products-list">
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
                </ProductListUl>
            </SectionTag>
            <SectionTag className="pagination">
                { numPages > 1 && <p>Page {currentPage} of {numPages}</p> }
                { !isFirst && <li><Link to={prevPage} rel="prev">Previous</Link></li> }
                { !numPages > 1 && Array.from({ length: numPages }, (_, i) => (
                    <li>
                        <Link 
                            key={`pagination-number${i + 1}`}
                            to={`/${i === 0 ? "" : i + 1}`}
                        >
                            {i + 1}
                        </Link>
                    </li>
                ))}
                { !isLast && <li><Link to={nextPage} rel="next">Next</Link></li> }
            </SectionTag>
        </Layout>
    );
};

export const query = graphql`
query productListQuery($skip: Int!, $limit: Int!, $filter: StrapiProductFilterInput){
    allStrapiProduct(
        sort: { fields: id, order: DESC }
        limit: $limit
        skip: $skip
        filter: $filter
    ) {
        nodes {
            id
            price
            slug
            title
            description
            categories {
                name
                slug
            }
            image {
                childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    }
    allStrapiCategory {
        nodes {
            name
            slug
        }
    }
}`