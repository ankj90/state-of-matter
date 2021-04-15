import React from "react"
import { graphql } from "gatsby"
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
      <span className="text-2xl">{data.editor}</span>
    </>
  )
}

const SidebarContent = ({ tags }) => {
  return (
    <div className="text-lg lg:text-4xl flex lg:block -mx-3 lg:mx-0">
      {tags.map(tag => (
        <div
          className="cursor-pointer bg-gray-200 lg:bg-white px-3 py-1 lg:px-0 lg:py-10 mx-2 lg:mx-0 rounded-full lg:rounded-none"
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
        <Post data={post} />
      ))}
    </div>
  )
}

const Post = ({ data }) => {
  return (
    <a
      href={`/post/${data.slug.current}`}
      className="flex flex-col xl:flex-row xl:items-center justify-between px-10 xl:px-16 py-5 border-b border-gray-300 hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col">
        <h2 className="text-4xl">{data.title}</h2>
        <div className="flex items-center py-1">
          {data.category.map(c => (
            <span
              className="bg-gray-100 border-r px-3 rounded-full mr-2"
              key={c.id}
            >
              {c.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col xl:pl-20">
        <div className="flex items-center py-1">
          {data.tags.map(tag => (
            <span
              className="bg-gray-100 border-r px-3 rounded-full mr-2"
              key={tag.id}
            >
              {tag.title}
            </span>
          ))}
        </div>
      </div>
    </a>
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
