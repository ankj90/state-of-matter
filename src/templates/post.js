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
      sidebar={<SidebarContent data={data.sanityPost} />}
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

const SidebarContent = ({ data }) => {
  const author = data.author[0]
  return (
    <>
      <h2 className="text-4xl lg:text-5xl lg:mt-10">{author.name}</h2>
      <div className="flex flex-col text-2xl lg:text-3xl pt-3 lg:pt-5">
        <span>{author.nationality}</span>
        <span>{data.date}</span>
      </div>
      <div className="flex flex-col text-lg lg:text-xl pt-3 lg:pt-5">
        {data.category.map(c => (
          <Link to={`/category/${slug(c.title)}`}>
            <span key={c.id}>{c.title}</span>
          </Link>
        ))}
      </div>
      <div className="flex flex-col text-lg lg:text-xl pt-3 lg:pt-5">
        {data.tags.map(t => (
          <Link to={`/tag/${slug(t.title)}`}>
            <span key={t.id}>{t.title}</span>
          </Link>
        ))}
      </div>
      {/* <span className="text-xl lg:text-2xl py-3">2074 Words</span> */}
      <a href={data.podcastLink} className="text-xl lg:text-2xl py-3">
        Listen to this as a podcast
      </a>
    </>
  )
}

const BodyContent = ({ contentWarning, data }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className="text-xl paragraphs px-10 py-8 lg:p-16 font-slab">
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
      <SanityBlockRenderer data={data} />
    </div>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
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
