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
            id
            slug {
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
      component: path.resolve(`./src/templates/post.js`),
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

async function createIssueParentPages(actions, graphql) {
  const { createPage } = actions
  const result = await graphql(`
    query MyQuery {
      allSanityIssues {
        group(field: year) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const years = result.data.allSanityIssues.group.map(grp => grp.fieldValue)

  years.forEach((year, index) => {
    createPage({
      path: path.join("issues", year),
      component: path.resolve(`./src/templates/issues.js`),
      context: {
        year: parseInt(year),
        years,
      },
    })
  })
}

async function createGenericPages(actions, graphql) {
  const { createPage } = actions
  const result = await graphql(`
    query GenericPageQuery {
      allSanityPage {
        edges {
          node {
            id
            slug {
              current
            }
            subpages {
              slug
              _key
              _rawBody
              title
            }
            title
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors
  const pages = result.data.allSanityPage.edges

  pages.forEach(({ node }) => {
    node.subpages.forEach(subpage => {
      createPage({
        path: path.join(node.slug.current, subpage.slug),
        component: path.resolve(`./src/templates/generic.js`),
        context: {
          pageTitle: node.title,
          subpage: subpage,
          links: node.subpages.map(subpage => ({
            link: path.join(node.slug.current, subpage.slug),
            slug: subpage.slug,
            title: subpage.title,
          })),
        },
      })
    })
  })
}

exports.createPages = async ({ actions, graphql }) => {
  await createPostPages(actions, graphql)
  await createIssuePages(actions, graphql)
  await createGenericPages(actions, graphql)
  await createIssueParentPages(actions, graphql)
}
