import React from "react"

const Sidebar = ({ children, hasSidebar }) => {
  const display = hasSidebar ? "flex" : "hidden"
  return (
    <div
      id="home-cat"
      className={`col-span-12 lg:col-span-3 ${display} flex-col lg:overflow-y-auto py-4 lg:py-8 lg:px-8`}
    >
      {children}
    </div>
  )
}

export default Sidebar
