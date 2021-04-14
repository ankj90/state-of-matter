import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Header = ({ content }) => {
  return (
    <header className="relative overflow-hidden flex-shrink-0 text-white">
      <div className="p-8 md:p-12 flex flex-col z-10 relative">{content}</div>
      {/* <img
        src={"tree-bg.jpg"}
        alt="Header Background Image"
        className="absolute inset-0 h-full w-full object-cover z-0"
      /> */}
      <StaticImage
        src="../images/tree-bg.png"
        alt="Header Background Image"
        width="full"
        height="full"
        className="h-full w-full object-cover z-0 absolute-important inset-0"
      ></StaticImage>
    </header>
  )
}

export default Header
