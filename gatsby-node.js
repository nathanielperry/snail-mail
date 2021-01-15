/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`{
        allStrapiProduct(filter: {sold: {eq: false}}) {
            nodes {
                slug
                categories {
                    slug
                }
            }
        }
    }`);

  if (result.errors) {
      throw result.errors;
  }

  const products = result.data.allStrapiProduct.nodes;
  //Get all used categories
  const allCategories = products.reduce((acc, cur) => {
    acc.push(...cur.categories.map(cat => cat.slug));
    return acc;
  }, []);
  //filter for unique categories
  const uniqueCategories = allCategories.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  //Individual Product Pages
  products.forEach((product) => {
    createPage({
        path: `/product/${product.slug}`,
        component: require.resolve("./src/templates/product.js"),
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
            filter: {},
        },
    });
  });

  //Category Pages
  uniqueCategories.forEach((category, i) => {
    const numProductsInCategory = products.filter(p => p.categories.map(c => c.slug).includes(category)).length;
    const numPagesInCategory = Math.ceil(numProductsInCategory / productsPerPage);
    Array.from({ length: numPagesInCategory }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/${category}/` : `/category/${category}/${i + 1}`,
            component: path.resolve("./src/templates/product-list.js"),
            context: {
                limit: productsPerPage,
                skip: i * productsPerPage,
                numPages: numPagesInCategory,
                currentPage: i + 1,
                category,
                filter: {categories: {elemMatch: {slug: {eq: category}}}},
            },
        });
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
