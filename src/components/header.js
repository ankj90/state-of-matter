import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const Header = ({ content, ref, isHeaderFullHeight, currentIssue }) => {
  const image = currentIssue.image.asset.gatsbyImageData
  const height = isHeaderFullHeight ? "h-screen" : "lg:h-36"
  return (
    <header
      className={`relative flex justify-between flex-shrink-0 text-white ${height}  z-10 lg:pl-20 pt-12 lg:pt-0`}
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
        className="h-full w-full object-cover z-0 absolute-important inset-0"
        style={{ filter: "brightness(50%)" }}
      />
    </header>
  )
}

export default Header
