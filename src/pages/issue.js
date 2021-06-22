import React from "react"
import { graphql } from "gatsby"
import { PostListItem } from "../components/post-list-item"
import Layout from "../components/layout"

const Index = ({ pageContext, data }) => {
  const headData = {
    title: `Issue ${data.sanityIssues.number}`,
    date: data.sanityIssues._createdAt,
    editor: data.sanityIssues.editor[0] ? data.sanityIssues.editor : "",
  }
  const posts = data.sanityIssues.posts
  const tags = posts
    .map(post => post.tags)
    .flat()
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i) //Remove duplicates by id

  return (
    <Layout
      header={<HeaderContent data={headData} />}
      sidebar={<SidebarContent tags={tags} />}
      body={<BodyContent posts={posts} />}
    />
  )
}

const HeaderContent = ({ data }) => {
  return (
    <>
      <h1 className="text-6xl">{data.title}</h1>
      <span className="text-2xl">{data.date}</span>
      {data.editor[0] && (
        <span className="text-2xl">{data.editor[0].name}</span>
      )}
    </>
  )
}

const SidebarContent = ({ tags }) => {
  return (
    <div className="text-lg lg:text-4xl flex flex-row lg:flex-col -mx-3 lg:mx-0 px-10 lg:px-0">
      {tags.map(tag => (
        <div
          className="cursor-pointer bg-gray-200 lg:bg-white px-3 py-1 lg:px-0 lg:pb-10 mx-2 lg:mx-0 rounded-full lg:rounded-none"
          key={tag.id}
        >
          {tag.title}
        </div>
      ))}
    </div>
  )
}

const BodyContent = ({ posts }) => {
  return (
    <div className="border-t border-gray-300">
      {posts.map(post => (
        <PostListItem data={post} />
      ))}
    </div>
  )
}

export const query = graphql`
  query IssueQuery($id: String) {
    sanityIssues(id: { eq: $id }) {
      id
      number
      posts {
        id
        date
        title
        slug {
          current
        }
        author {
          id
          name
        }
        category {
          id
          title
        }
        tags {
          id
          title
        }
      }
      editor {
        id
        name
      }
      _createdAt(formatString: "MMM YYYY")
    }
  }
`

export default Index
