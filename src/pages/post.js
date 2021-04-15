import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Body from "../components/body"
const BlockContent = require("@sanity/block-content-to-react")

const Post = ({ data, pageContext }) => {
  return (
    <Layout
      header={<HeaderContent title={data.sanityPost.title} />}
      sidebar={<SidebarContent data={data.sanityPost} />}
      body={<PostBody data={data.sanityPost} />}
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
      <h2 className="text-4xl lg:text-5xl">{author.name}</h2>
      <div className="flex flex-col text-2xl lg:text-3xl pt-3 lg:pt-5">
        <span>{author.nationality}</span>
        <span>{data.date}</span>
      </div>
      <div className="flex flex-col text-lg lg:text-xl pt-3 lg:pt-5">
        {data.tags.map(t => (
          <span key={t.id}>{t.title}</span>
        ))}
      </div>
      {/* <span className="text-xl lg:text-2xl py-3">2074 Words</span> */}
      <a href={data.podcastLink} className="text-xl lg:text-2xl py-3">
        Listen to this as a podcast
      </a>
    </>
  )
}

const PostBody = ({ data }) => {
  const serializers = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
  }
  const Block = <BlockContent blocks={data._rawBody} serializers={serializers} />
  return <div className="text-xl paragraphs px-10 py-8 lg:p-16 markdown">{Block}</div>
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
