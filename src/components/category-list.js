import React from "react";
import styled from 'styled-components';
import { Link } from "gatsby";

const CategoryListUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 1rem;
`;

export default function CategoryList({ categories }) {
    return (
        <>
            <h2>Categories</h2>
            <CategoryListUl>
                {categories.map(category => (
                    <li><Link to={`/category/${category.slug}`}>{category.name}</Link></li>
                ))}
            </CategoryListUl>
        </>
    )
}