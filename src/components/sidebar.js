import React from "react"

const Sidebar = ({ children }) => {
  return (
    <div
      id="home-cat"
      className="col-span-12 lg:col-span-3 flex flex-col lg:overflow-y-auto py-8 px-8"
    >
      {children}
    </div>
  )
}

export default Sidebar
