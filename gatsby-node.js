const { createFilePath } = require("gatsby-source-filesystem")
var slug = require('slug')
const path = require("path")

async function createPostPages(actions, graphql) {
  const { createPage } = actions
  const result = await graphql(`
    query MyQuery {
      allSanityPost {
        edges {
          node {
            title
            id
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const posts = result.data.allSanityPost.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: path.join('post', slug(node.title)),
      component: path.resolve(
        `./src/pages/post.js`
      ),
      context: {
        id: node.id,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  await createPostPages(actions, graphql)
}
