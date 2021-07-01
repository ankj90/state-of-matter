import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { SanityBlockRenderer } from "../components/sanityBlockRenderer"

const Generic = ({ pageContext }) => {
  return (
    <Layout
      header={<HeaderContent title={pageContext.pageTitle} />}
      sidebar={
        <SidebarContent
          links={pageContext.links}
          subpage={pageContext.subpage}
        />
      }
      body={<BodyContent data={pageContext.subpage._rawBody} />}
    />
  )
}

const HeaderContent = ({ title }) => {
  return (
    <>
      <h1 className="text-4xl lg:text-6xl">{title}</h1>
    </>
  )
}

const SidebarContent = ({ links, subpage }) => {
  return (
    <div className="flex flex-row lg:flex-col -mx-3 lg:mx-0 px-10 lg:px-0 overflow-x-auto">
      {links.map(link => (
        <Link
          to={`/${link.link}/`}
          className="sidebar-link"
          activeClassName="link-active"
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}

const BodyContent = ({ data }) => {
  return (
    <div className="p-8 lg:p-10 text-xl">
      <SanityBlockRenderer data={data} />
    </div>
  )
}

export default Generic
