const { createFilePath } = require("gatsby-source-filesystem")
var slug = require("slug")
const path = require("path")

async function createPostPages(actions, graphql) {
  const { createPage } = actions
  const result = await graphql(`
    query PostPageQuery {
      allSanityPost {
        edges {
          node {
            title
            id
            slug{
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const posts = result.data.allSanityPost.edges

  posts.forEach(({ node }, index) => {
    createPage({
      path: path.join("post", node.slug.current),
      component: path.resolve(`./src/pages/post.js`),
      context: {
        id: node.id,
      },
    })
  })
}

async function createIssuePages(actions, graphql) {
  const { createPage } = actions
  const result = await graphql(`
    query IssuePageQuery {
      allSanityIssues {
        edges {
          node {
            id
            number
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const issues = result.data.allSanityIssues.edges

  issues.forEach(({ node }, index) => {
    createPage({
      path: path.join("issue", slug(`issue-${node.number}`)),
      component: path.resolve(`./src/pages/issue.js`),
      context: {
        id: node.id,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  await createPostPages(actions, graphql)
  await createIssuePages(actions, graphql)
}
