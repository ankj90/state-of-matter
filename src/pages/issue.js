import React, { useState } from "react"
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
  const categories = posts
    .map(post => post.category)
    .flat()
    .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i) //Remove duplicates by id

  const sidebarLinks = [{ id: 0, title: "All" }, ...categories]
  const [activeLink, setActiveLink] = useState(sidebarLinks[0])
  const postsToDisplay =
    activeLink.title === "All"
      ? posts
      : posts.filter(post =>
          post.category
            .map(c => c.id === activeLink.id)
            .reduce((b, c) => c || b)
        )

  // console.log(
  //   posts.filter(post =>
  //     post.category.filter(c => c.title === activeLink.title)
  //   )
  // )

  return (
    <Layout
      header={<HeaderContent data={headData} />}
      sidebar={
        <SidebarContent
          buttons={sidebarLinks}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      }
      body={<BodyContent posts={postsToDisplay} />}
    />
  )
}

const HeaderContent = ({ data }) => {
  return (
    <>
      <h1 className="text-36 lg:text-48 leading-42 lg:leading-56">
        {data.title}
      </h1>
      <span className="text-24 leading-24">{data.date}</span>
    </>
  )
}

const SidebarContent = ({ buttons, activeLink, setActiveLink }) => {
  return (
    <div>
      <ul className="flex flex-row lg:flex-col -mx-3 lg:mx-0 px-10 lg:px-0 overflow-x-auto">
        {buttons.map(b => (
          <li className="sidebar-link">
            <button
              onClick={() => setActiveLink(b)}
              className={`${b.id === activeLink.id ? "text-custom-red" : ""}`}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
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
