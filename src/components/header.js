import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { MenuButton } from "./icons/MenuButton"

const Header = ({ content, ref }) => {
  return (
    <header className="relative flex justify-between flex-shrink-0 text-white lg:h-36 z-10 lg:pl-20 pt-12 lg:pt-0" ref={ref}>
      <div className="p-8 lg:px-12 flex flex-col z-10 relative justify-center">{content}</div>
      <div className="z-30 flex items-center mr-10">
        <div></div>
      </div>
      <StaticImage
        src="../images/bg-test.jpg"
        alt="Header Background Image"
        className="h-full w-full object-cover z-0 absolute-important inset-0"
        style={{ filter: "brightness(50%)" }}
      ></StaticImage>
    </header>
  )
}

export default Header
