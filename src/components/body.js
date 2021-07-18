import React from "react"

import Sidebar from "./sidebar"
import ContentArea from "./contentArea"

const Body = ({ sidebar, body, hasSidebar = false, isHeaderFullHeight }) => {
  const overflow = isHeaderFullHeight
    ? "overflow-y-auto lg:overflow-y-visible"
    : "overflow-y-auto"
  return (
    <main
      className={`flex flex-col lg:grid grid-cols-12 h-full z-20 relative lg:ml-20 bg-white ${overflow} pb-8 lg:pb-0`}
    >
      <Sidebar hasSidebar={hasSidebar}>{sidebar}</Sidebar>
      <ContentArea hasSidebar={hasSidebar}>{body}</ContentArea>
    </main>
  )
}

export default Body
