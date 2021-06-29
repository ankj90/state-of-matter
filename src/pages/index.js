import React, { useRef } from "react"
import { graphql, Link } from "gatsby"
import { useIntersection } from "react-use"
import dayjs from "dayjs"
import Layout from "../components/layout"
import { TwitterTimelineEmbed } from "react-twitter-embed"
import { SanityBlockRenderer } from "../components/sanityBlockRenderer"

const Index = ({ data }) => {
  const currentIssue = data.currentIssue.nodes[0]
  return (
    <Layout
      header={<HeaderContent currentIssue={currentIssue} />}
      body={<BodyContent data={data.siteSettings} />}
      isHeaderFullHeight={true}
    />
  )
}

const HeaderContent = ({ currentIssue }) => {
  const dateString = `${currentIssue.year}-${currentIssue.month}-1`
  return (
    <div className="flex flex-col justify-end items-start h-full w-full">
      <Link
        to={`/issue/issue-${currentIssue.number}`}
        className="flex flex-col text-white"
      >
        <h1 className="text-36 leading-42">State Of Matter</h1>
        <div className="flex items-center text-30 leading-36">
          <span>Issue {currentIssue.number}</span>
          <span className="px-3">|</span>
          <span>{dayjs(dateString).format("MMM YY")}</span>
        </div>
      </Link>
      <div className="self-center hidden lg:block">
        <svg
          width="30"
          height="19"
          viewBox="0 0 30 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.525 0L15 11.45L26.475 0L30 3.525L15 18.525L0 3.525L3.525 0Z"
            fill="#FF5757"
          />
        </svg>
      </div>
    </div>
  )
}

const BodyContent = ({ data, scrollRef }) => {
  return (
    <div
      className="text-lg grid lg:grid-cols-12 text-custom-darkblue"
      ref={scrollRef}
    >
      <div className="col-span-12 lg:col-span-8 flex flex-col h-full border-r">
        <div className="text-24 leading-24 font-slab border-b border-custom-lightgray p-10 font-bold">
          <SanityBlockRenderer data={data._rawAboutUsText} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-custom-lightgray text-24 leading-24 font-slab border-b border-custom-lightgray font-light">
          {data.blocks.map(block => (
            <div className="p-10 flex flex-col bg-white">
              <SanityBlockRenderer
                data={block._rawText}
                className="text-18 leading-21"
              />
              {block.links.map(link => (
                <a
                  href={link.url}
                  className="text-custom-red font-bold mt-6 font-sans"
                >
                  {link.text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 text-24 leading-24 font-slab border-r border-b border-custom-lightgray p-6 h-full">
        <div className="twitter-iframe h-96 lg:h-full">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="stateofmattermz"
            options={{ height: "100%" }}
          />
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query IndexPageQuery {
    currentIssue: allSanityIssues(
      sort: { fields: [year, month], order: [DESC, DESC] }
      limit: 1
    ) {
      nodes {
        id
        year
        month
        number
      }
    }
    siteSettings: sanitySiteSettings {
      _rawAboutUsText
      blocks {
        _rawText
        links {
          text
          url
        }
      }
    }
  }
`

export default Index
