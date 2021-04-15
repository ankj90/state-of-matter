import React from "react"

import Header from "./header"
import Body from "./body"
import { Helmet } from "react-helmet"

const Layout = ({ children, header, sidebar, body }) => {
  return (
    <div className="flex">
      <div className="h-screen w-full flex flex-col overflow-y-auto">
        <Helmet title="State Of Matter"></Helmet>
        <Header content={header} />
        <Body sidebar={sidebar} body={body} />
      </div>
    </div>
  )
}

const RotatedText = () => {
  return (
    <div className="pt-10">
      <h1 className="rotate-text">State Of Matter</h1>
    </div>
  )
}

export default Layout
