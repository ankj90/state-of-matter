import React from "react"
import { Link } from "gatsby"
import slug from "slug"
import Layout from "../components/layout"
import { PostListItem } from "../components/post-list-item"

const Tag = ({ pageContext }) => {
  return (
    <Layout
      header={<HeaderContent title={pageContext.name} />}
      sidebar={<SidebarContent data={pageContext.tags} />}
      body={<BodyContent data={pageContext.posts} />}
    ></Layout>
  )
}

const HeaderContent = ({ title }) => {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl">{title}</h1>
    </div>
  )
}

const SidebarContent = ({ data }) => {
  return (
    <div className="text-lg lg:text-4xl flex flex-row lg:flex-col -mx-3 lg:mx-0 px-10 lg:px-0">
      {data.map((tag, index) => (
        <Link
          to={`/tag/${slug(tag)}`}
          className="cursor-pointer bg-gray-200 lg:bg-white px-3 py-1 lg:px-0 lg:pb-10 mx-2 lg:mx-0 rounded-full lg:rounded-none"
          key={index}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}

const BodyContent = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <PostListItem data={item} key={index} />
      ))}
    </div>
  )
}

export default Tag
