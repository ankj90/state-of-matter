import React from "react"

import Sidebar from "./sidebar"
import ContentArea from "./contentArea"

const Body = ({ sidebar, body, hasSidebar = false }) => {
  return (
    <main className="flex flex-col lg:grid grid-cols-12 h-full z-10 relative lg:pl-20">
      <Sidebar hasSidebar={hasSidebar}>{sidebar}</Sidebar>
      <ContentArea hasSidebar={hasSidebar}>{body}</ContentArea>
    </main>
  )
}

export default Body
