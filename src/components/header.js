import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { MenuButton } from "./icons/MenuButton"

const Header = ({ content }) => {
  return (
    <header className="relative flex justify-between flex-shrink-0 text-white">
      <div className="p-8 md:p-12 flex flex-col z-10 relative">{content}</div>
      <div className="z-30 flex items-center mr-10">
        <div></div>
      </div>
      <StaticImage
        src="../images/tree-bg.png"
        alt="Header Background Image"
        className="h-full w-full object-cover z-0 absolute-important inset-0"
      ></StaticImage>
    </header>
  )
}

export default Header
