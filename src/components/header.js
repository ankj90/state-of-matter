import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Header = ({ content, ref, isHeaderFullHeight, currentIssue }) => {
  const image = currentIssue.image.asset.gatsbyImageData
  const height = isHeaderFullHeight ? "lg:h-screen" : "h-auto"
  const position = isHeaderFullHeight ? "fixed-important" : "absolute-important"
  return (
    <header
      className={`relative flex justify-between flex-shrink-0 text-white ${height} min-h-36 z-10 lg:pl-20 pt-12 lg:pt-0`}
      ref={ref}
    >
      <div className="p-8 lg:px-12 flex flex-col z-10 relative justify-center w-full">
        {content}
      </div>
      <div className="z-30 flex items-center mr-10">
        <div></div>
      </div>
      <GatsbyImage
        image={image}
        alt="Header Background Image"
        className={`h-full w-full object-cover z-0 inset-0 ${position}`}
        style={{ filter: `brightness(${isHeaderFullHeight ? "80%" : "50%"})` }}
      />
    </header>
  )
}

export default Header
