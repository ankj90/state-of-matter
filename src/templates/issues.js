import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Issues = ({ data, pageContext }) => {
  const sidebarData = pageContext.years
  const bodyData = data.allSanityIssues.edges.map(edge => edge.node)
  return (
    <Layout
      header={<HeaderContent />}
      sidebar={<SidebarContent data={sidebarData} />}
      body={<BodyContent data={bodyData} />}
    />
  )
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-6xl">Issues</h1>
    </>
  )
}

const SidebarContent = ({ data }) => {
  return (
    <div className="text-2xl lg:text-3xl flex flex-row lg:flex-col items-center overflow-x-auto">
      <h2 className="text-4xl lg:text-5xl lg:mb-5 mr-3">Year</h2>
      {data.map(( year, index ) => (
        <a key={index} href={`/issues/${year}`} className="px-3 lg:px-0 lg:py-3">
          {year}
        </a>
      ))}
    </div>
  )
}

const BodyContent = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-10 lg:px-16 py-10">
      {data.map(month => (
        <Issue key={month.id} data={month} />
      ))}
    </div>
  )
}

const Issue = ({ data }) => {
  console.log(data);
  return (
    <a href={`/issue/issue-${data.number}`} className="">
      <img
        src={ `https://via.placeholder.com/225x300/222222/444444?text=${data.month}` }
        alt=""
        className="w-full h-full"
      />
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
        }
      }
    }
  }
`
export default Issues
