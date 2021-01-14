/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`{
        allStrapiProduct {
            nodes {
                slug
            }
        }
    }`);

  if (result.errors) {
      throw result.errors;
  }

  const bugs = result.data.allStrapiProduct.nodes;
  const ProductTemplate = require.resolve("./src/templates/product.js");

  bugs.forEach((product) => {
    createPage({
        path: `/product/${product.slug}`,
        component: ProductTemplate,
        context: {
            slug: product.slug,
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