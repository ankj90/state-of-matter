import React from "react"

import Header from "./header"
import Body from "./body"

const Layout = ({ children, header, sidebar, body }) => {
  return (
    <div className="flex">
      <div className="font-serif h-screen w-24">
        <div style={{ height: "50%" }} className="bg-custom-lightgray"></div>
        <div style={{ height: "50%" }} className="bg-custom-darkblue"></div>
      </div>
      <div className="h-screen w-full flex flex-col overflow-y-auto">
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
