import React, { useState } from "react"
import SanityImage from "gatsby-plugin-sanity-image"
import { ArrowExpandIcon } from "./icons/arrow-expand"
import { CloseButton } from "./icons/close"
const BlockContent = require("@sanity/block-content-to-react")

const serializers = {
  types: {
    image: props => <SanityImage {...props.node} className="w-full" />,
    divider: props => <Divider {...props} />,
    centeredBlock: props => <CenteredBlock {...props} />,
    embed: props => <Embed {...props} />,
  },
}

export const SanityBlockRenderer = ({ data, className = "" }) => {
  const Block = <BlockContent blocks={data} serializers={serializers} />
  return <div className={`markdown ${className}`}>{Block}</div>
}

const Embed = props => {
  const [isOpen, setOpen] = useState(false)
  const positionOuter = isOpen ? "fixed" : "relative"
  const outerDimensions = isOpen ? "h-screen w-screen" : "w-full h-full"
  const outerPadding = isOpen ? "p-10" : "p-0"
  const bgColor = isOpen ? "bg-custom-black-70" : "bg-custom-lightgray"
  const buttonMargin = isOpen ? "m-16" : "m-5"
  const buttonColors =
    "border-custom-red text-custom-red hover:bg-custom-red hover:text-white"
  const buttonBorder = "border hover:border-0"
  const buttonTransition = "transition-colors duration-200 ease-linear"
  const icon = isOpen ? <CloseButton /> : <ArrowExpandIcon />
  return (
    <div
      className={`${positionOuter} inset-0 ${outerDimensions} ${outerPadding} ${bgColor} my-5`}
    >
      <button
        className={`${buttonMargin} ${buttonColors} ${buttonBorder} ${buttonTransition} rounded-full hover:shadow absolute top-0 right-0 p-3`}
        onClick={() => setOpen(!isOpen)}
      >
        {icon}
      </button>
      <iframe
        src="https://airtable.com/embed/shrD3nwn5f844l16j?backgroundColor=cyan"
        frameborder="0"
        className="w-full h-full"
        style={{
          minHeight: "550px",
        }}
      ></iframe>
    </div>
  )
}

const CenteredBlock = props => {
  const { width, boxAlign, textAlign } = props.node
  const blockWidth = `w-full md:${width}`
  const blockMargin = `md:${boxAlign}`
  return (
    <div className={`${blockWidth} ${blockMargin} ${textAlign}`}>
      <SanityBlockRenderer data={props.node.content} />
    </div>
  )
}

const Divider = props => {
  const width = props.node.width || "w-32"
  const colorClass = props.node.color ? "" : "bg-custom-lightgray"
  return (
    <div
      className={`${width} ${colorClass} mx-auto my-4`}
      style={{
        backgroundColor: props.node.color || "",
        height: props.node.thickness || "2px",
      }}
    ></div>
  )
}
