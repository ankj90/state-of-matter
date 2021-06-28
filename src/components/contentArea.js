import React from "react"

const ContentArea = ({ children, hasSidebar }) => {
  const cols = hasSidebar ? "lg:col-span-9 lg:border-l" : ""
  return (
    <div
      id=""
      className={`col-span-12 ${cols} flex flex-col border-gray-300 lg:overflow-y-auto`}
    >
      {children}
    </div>
  )
}

export default ContentArea
