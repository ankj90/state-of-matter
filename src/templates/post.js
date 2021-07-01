import React, { useState } from "react"
import slug from "slug"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SanityBlockRenderer } from "../components/sanityBlockRenderer"

const Post = ({ data, pageContext }) => {
  return (
    <Layout
      header={<HeaderContent title={data.sanityPost.title} />}
      sidebar={<SidebarContent data={data.sanityPost} issueData={data.issue} />}
      body={
        <BodyContent
          data={data.sanityPost._rawBody}
          contentWarning={data.sanityPost.contentWarning}
        />
      }
    ></Layout>
  )
}

const HeaderContent = ({ title }) => {
  return <h1 className="text-4xl lg:text-6xl">{title}</h1>
}

const SidebarContent = ({ data, issueData }) => {
  const author = data.author[0]
  return (
    <div className="flex flex-col w-full px-8 lg:px-0">
      <div className="flex flex-col">
        <Link to={`/profile/${slug(author.name)}`}>
          <h2 className="text-4xl lg:text-5xl lg:mt-10">{author.name}</h2>
        </Link>
        <div className="flex flex-col text-2xl lg:text-3xl pt-3 lg:pt-5">
          <span>{author.nationality}</span>
        </div>
        {/* {author._rawBio && author._rawBio[0] && (
          <SanityBlockRenderer
            data={[author._rawBio[0]]}
            className="markdown text-sm font-light leading-tight mb-20"
          />
        )} */}
      </div>
      {issueData && issueData.number && (
        <a
          href={`/issue/issue-${issueData.number}`}
          className="text-2xl lg:text-3xl font-light"
        >
          Issue - {issueData.number}
        </a>
      )}
      <div className="flex flex-col text-lg lg:text-xl pt-3 lg:pt-5 font-light">
        {data.tags.map(t => (
          <Link to={`/tag/${slug(t.title)}`}>
            <span key={t.id}>{t.title}</span>
          </Link>
        ))}
      </div>
      {/* <span className="text-xl lg:text-2xl py-3">2074 Words</span> */}
      {data.podcastLink && (
        <a
          href={data.podcastLink}
          className="text-lg lg:text-xl py-3 font-light"
        >
          Listen to this as a podcast
        </a>
      )}
    </div>
  )
}

const BodyContent = ({ contentWarning, data }) => {
  console.log(contentWarning)
  const [isOpen, setOpen] = useState(false)
  return (
    <div className="text-xl px-10 py-8 lg:p-16 font-slab">
      {contentWarning.length > 0 && (
        <div className="flex mb-10">
          <div
            className="flex border-2 border-custom-red text-custom-blue p-2 leading-none select-none"
            onClick={() => setOpen(!isOpen)}
          >
            <h3 className="mr-3 align-baseline">
              Content Warnings
              {isOpen && <span> :</span>}
            </h3>
            {isOpen && (
              <ul>
                {contentWarning.map((warning, index) => (
                  <span key={warning.id}>
                    {warning.title}
                    {index === contentWarning.length - 1 ? " " : ", "}
                  </span>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <SanityBlockRenderer data={data} />
    </div>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
    issue: sanityIssues(posts: { elemMatch: { id: { eq: $id } } }) {
      id
      number
      month
    }
    sanityPost(id: { eq: $id }) {
      title
      id
      date
      category {
        id
        title
      }
      _rawBody
      author {
        id
        name
        nationality
        image {
          asset {
            assetId
          }
        }
        _rawBio
      }
      tags {
        id
        title
      }
      contentWarning {
        id
        title
      }
      podcastLink
      translator {
        id
        nationality
        name
        image {
          asset {
            assetId
          }
        }
      }
    }
  }
`

export default Post
