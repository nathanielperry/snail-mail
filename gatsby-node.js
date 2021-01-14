/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    //Individual Product Pages
    const productResult = await graphql(`{
        allStrapiProduct {
            nodes {
                slug
            }
        }
    }`);

  if (productResult.errors) {
      throw productResult.errors;
  }

  const products = productResult.data.allStrapiProduct.nodes;
  const ProductTemplate = require.resolve("./src/templates/product.js");

  products.forEach((product) => {
    createPage({
        path: `/product/${product.slug}`,
        component: ProductTemplate,
        context: {
            slug: product.slug,
        },
    });
  });

  //Product List Pages
  const productsPerPage = 9;
  const numPages = Math.ceil(products.length / productsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
        path: i === 0 ? `/products/` : `/products/${i + 1}`,
        component: path.resolve("./src/templates/product-list.js"),
        context: {
            limit: productsPerPage,
            skip: i * productsPerPage,
            numPages,
            currentPage: i + 1,
        },
    });
  });
}

module.exports.onCreateNode = async ({ node, actions, createNodeId }) => {
    const crypto = require(`crypto`);

    if (node.internal.type === "StrapiProduct") {
        const newNode = {
            id: createNodeId(`StrapiProductContent-${node.id}`),
            parent: node.id,
            children: [],
            internal: {
                content: node.content || " ",
                type: "StrapiProductContent",
                mediaType: "text/markdown",
                contentDigest: crypto
                .createHash("md5")
                .update(node.content || " ")
                .digest("hex"),
            },
        };
        actions.createNode(newNode);
        actions.createParentChildLink({
            parent: node,
            child: newNode,
        });
    }
};

//Product List Pages
