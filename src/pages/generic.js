import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { SanityBlockRenderer } from "../components/sanityBlockRenderer"

const Generic = ({ pageContext }) => {
  console.log(pageContext)
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
      <h1 className="text-6xl">{title}</h1>
    </>
  )
}

const SidebarContent = ({ links, subpage }) => {
  return (
    <div className="text-2xl flex flex-col">
      {links.map(link => (
        <Link
          to={`/page/${link.link}`}
          className={`py-3 hover:text-custom-red ${
            link.slug === subpage.slug ? "font-bold" : ""
          }`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  )
}

const BodyContent = ({ data }) => {
  return (
    <div className="border-t border-gray-300 px-10 lg:p-10 text-xl paragraphs">
      <SanityBlockRenderer data={data} />
    </div>
  )
}

export default Generic