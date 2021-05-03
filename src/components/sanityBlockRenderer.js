import React from 'react';
const BlockContent = require("@sanity/block-content-to-react")
export const SanityBlockRenderer = ({ data }) => {
  const serializers = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      ),
    },
  }
  const Block = <BlockContent blocks={data} serializers={serializers} />
  return <div className="markdown">{Block}</div>
}