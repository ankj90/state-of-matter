import React from "react"
import { graphql } from "gatsby"
import dayjs from "dayjs"
import Layout from "../components/layout"
import { TwitterTimelineEmbed } from "react-twitter-embed"

const Index = ({ data }) => {
  const currentIssue = data.currentIssue.nodes[0]
  return (
    <Layout
      header={<HeaderContent currentIssue={currentIssue} />}
      body={<BodyContent />}
      isHeaderFullHeight={true}
    />
  )
}

const HeaderContent = ({ currentIssue }) => {
  const dateString = `${currentIssue.year}-${currentIssue.month}-1`
  return (
    <div className="flex flex-col justify-end items-start h-full w-full">
      <div className="flex flex-col">
        <h1 className="text-36 leading-42">State Of Matter</h1>
        <div className="flex items-center text-30 leading-36">
          <span>Issue {currentIssue.number}</span>
          <span className="px-3">|</span>
          <span>{dayjs(dateString).format("MMM YY")}</span>
        </div>
      </div>
      <div className="self-center">
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

const BodyContent = () => {
  return (
    <div className="text-lg grid grid-cols-12 text-custom-darkblue">
      <div className="col-span-8 flex flex-col h-full border-r">
        <div className="text-24 leading-24 font-slab border-b border-custom-lightgray p-10 font-bold">
          <p className="mb-6">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
            quibusdam veritatis, fuga voluptas ullam maiores, doloremque sed
            harum magni expedita adipisci id omnis commodi ut voluptate quisquam
            ea voluptates dolorum.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
            quibusdam veritatis, fuga voluptas ullam maiores, doloremque sed
            harum magni expedita adipisci id omnis commodi ut voluptate quisquam
            ea voluptates dolorum.
          </p>
        </div>
        <div className="grid grid-cols-2 text-24 leading-24 font-slab border-b border-custom-lightgray font-light">
          <div className="border border-custom-lightgray p-10 flex flex-col">
            <p className="text-18 leading-21">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
              consequuntur? Beatae.
            </p>
            <a href="/" className="text-custom-red font-bold mt-6 font-sans">
              Submit Now
            </a>
          </div>
          <div className="border border-custom-lightgray p-10 flex flex-col">
            <p className="text-18 leading-21">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
              consequuntur? Beatae.
            </p>
            <div className="flex items-center font-sans">
              <a
                href="/"
                className="text-custom-red font-bold mt-6 font-sans mr-4"
              >
                Donate
              </a>
              <a href="/" className="text-custom-red font-bold mt-6 font-sans">
                Shop
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 text-24 leading-24 font-slab border-r border-b border-custom-lightgray p-6">
        <div className="twitter-iframe h-full">
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
  }
`

export default Index
