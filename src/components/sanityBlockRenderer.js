import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import SanityImage from "gatsby-plugin-sanity-image"
const BlockContent = require("@sanity/block-content-to-react")
export const SanityBlockRenderer = ({ data, className = "" }) => {
  const serializers = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
      image: props => <SanityImage {...props.node} className="w-full" />,
      divider: props => (
        <div
          className={`h-1 w-32 ${
            props.node.color ? "" : "bg-custom-lightgray"
          } mx-auto my-4`}
          style={
            props.node.color && {
              backgroundColor: props.node.color,
            }
          }
        ></div>
      ),
    },
  }
  const Block = <BlockContent blocks={data} serializers={serializers} />
  return <div className={`markdown ${className}`}>{Block}</div>
}
