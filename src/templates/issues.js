import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"

const Issues = ({ data, pageContext }) => {
  const sidebarData = pageContext.years
  const bodyData = data.allSanityIssues.edges.map(edge => edge.node)
  return (
    <Layout
      header={<HeaderContent />}
      sidebar={
        <SidebarContent data={sidebarData} activeYear={pageContext.year} />
      }
      body={<BodyContent data={bodyData} />}
    />
  )
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-36 lg:text-48 leading-42 lg:leading-56">Issues</h1>
    </>
  )
}

const SidebarContent = ({ data, activeYear }) => {
  return (
    <div className="text-2xl lg:text-3xl flex flex-row lg:flex-col items-center overflow-x-auto px-8 lg:px-0">
      {/* <h2 className="text-4xl lg:text-5xl lg:mb-5 mr-3">Year</h2> */}
      {data.map((year, index) => (
        <Link
          key={index}
          to={`/issues/${year}`}
          className={`pr-3 lg:px-0 lg:py-3 ${
            year == activeYear ? "link-active" : ""
          }`}
        >
          {year}
        </Link>
      ))}
    </div>
  )
}

const BodyContent = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-10 p-8 lg:px-16 lg:py-10">
      {data.map(month => (
        <Issue key={month.id} data={month} />
      ))}
    </div>
  )
}

const Issue = ({ data }) => {
  return (
    <a href={`/issue/issue-${data.number}`} className="">
      <GatsbyImage
        image={data.bookCover.asset.gatsbyImageData}
        width={420}
      ></GatsbyImage>
    </a>
  )
}

export const query = graphql`
  query IssueYearPageQuery($year: Float!) {
    allSanityIssues(
      filter: { year: { eq: $year } }
      sort: { fields: month, order: ASC }
    ) {
      edges {
        node {
          id
          number
          month
          image {
            asset {
              gatsbyImageData
            }
          }
          bookCover {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
export default Issues
