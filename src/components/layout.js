import React, { useState } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { CloseButton } from "./icons/CloseButton"
import Header from "./header"
import slug from "slug"
import { useScroll } from "react-use"
import Body from "./body"
import { Helmet } from "react-helmet"
import { MenuButton } from "./icons/MenuButton"
import { GatsbyImage } from "gatsby-plugin-image"

const Layout = ({
  children,
  header,
  sidebar,
  body,
  isHeaderFullHeight = false,
  scrollRef,
}) => {
  const [isOpen, setOpen] = useState(false)
  const hasSidebar = sidebar ? true : false
  const data = useStaticQuery(graphql`
    {
      siteSettings: sanitySiteSettings {
        socialLinks {
          text
          url
          image {
            asset {
              gatsbyImageData
            }
          }
        }
      }
      allSanityCategory {
        nodes {
          title
          id
        }
      }
      currentIssue: allSanityIssues(
        sort: { fields: [year, month], order: [DESC, DESC] }
        limit: 1
      ) {
        nodes {
          id
          year
          month
          number
          image {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)
  const currentIssue = data.currentIssue.nodes[0]
  const categories = data.allSanityCategory.nodes
  const menuData = {
    categories,
    siteSettings: data.siteSettings,
  }
  return (
    <div className="flex w-full h-screen overflow-y-auto">
      <FloatingMenu isOpen={isOpen} setOpen={setOpen} data={menuData} />
      <SideMenu
        setOpen={setOpen}
        isOpen={isOpen}
        isHeaderFullHeight={isHeaderFullHeight}
        currentIssueLink={`/issue/issue-${currentIssue.number}`}
      />
      <div className="w-full flex flex-col relative" ref={scrollRef}>
        <MobileMenu isOpen={isOpen} setOpen={setOpen} />
        <Helmet title="State Of Matter" currentIssue={currentIssue}></Helmet>
        <Header
          content={header}
          isHeaderFullHeight={isHeaderFullHeight}
          currentIssue={currentIssue}
        />
        <Body
          sidebar={sidebar}
          body={body}
          hasSidebar={hasSidebar}
          isHeaderFullHeight={isHeaderFullHeight}
        />
      </div>
    </div>
  )
}

const MobileMenu = ({ isOpen, setOpen }) => {
  const textColor = isOpen ? "text-custom-red" : "text-white"
  const buttonIcon = isOpen ? (
    <CloseButton className={`h-6 w-6 ${textColor}`} />
  ) : (
    <MenuButton className={`h-6 w-6 ${textColor}`} />
  )
  return (
    <nav className="lg:hidden w-full bg-transparent px-8 py-4 flex justify-between items-center fixed z-40">
      <Link to="/">
        <h1 className={`text-2xl font-sans font-semibold ${textColor}`}>
          State of Matter
        </h1>
      </Link>

      <div className={`h-full`}>
        <button
          onClick={() => setOpen(!isOpen)}
          className="w-full h-full flex justify-center items-center focus:outline-none"
        >
          {buttonIcon}
        </button>
      </div>
    </nav>
  )
}

const SideMenu = ({
  isOpen,
  setOpen,
  isHeaderFullHeight,
  currentIssueLink,
}) => {
  const defaultColor = "bg-transparent text-custom-red"
  const menuColor = "bg-white text-custom-red"
  const hoverColor = "hover:bg-custom-red hover:text-custom-lightgray"
  const color = isOpen ? menuColor : defaultColor
  const buttonIcon = isOpen ? (
    <CloseButton className="h-10 w-10" />
  ) : (
    <MenuButton className="h-10 w-10" />
  )

  return (
    <div
      className={`w-10 md:w-20 h-screen bg-transparent z-20 absolute top-0 bottom-0 left-0 flex-shrink-0 hidden lg:flex flex-col border-r border-custom-red ${color} ${hoverColor} transition-all duration-200 ease-linear`}
    >
      <div className="h-36 flex-shrink-0">
        <button
          onClick={() => setOpen(!isOpen)}
          className="w-full h-full flex justify-center items-center focus:outline-none"
        >
          {buttonIcon}
        </button>
      </div>
      <div className="h-full flex flex-col">
        <Link
          to="/"
          className="flex justify-center items-center h-1/2 w-full no-default-style"
        >
          <StateOfMatterSVG className="h-2/3 w-7" />
        </Link>
        <Link
          to={currentIssueLink}
          className="flex justify-center items-center h-1/2 w-full no-default-style"
        >
          <CurrentIssueSVG className="h-2/3 w-6" />
        </Link>
      </div>
    </div>
  )
}

const FloatingMenu = ({ isOpen, setOpen, data }) => {
  const links1 = [
    {
      name: "Issues",
      href: `/issues/${new Date().getFullYear()}`,
    },
    // {
    //   name: "Adv Search",
    //   href: "/search/",
    // },
  ]
  const links2 = [
    {
      name: "Submit",
      href: "#",
    },
    {
      name: "Guidelines",
      href: "#",
    },
  ]
  const links3 = [
    {
      name: "Donate",
      href: "#",
    },
    {
      name: "About",
      href: "#",
    },
    {
      name: "Contact Us",
      href: "#",
    },
  ]
  const menuClass = isOpen ? "flex" : "hidden"
  const { socialLinks } = data.siteSettings
  return (
    <div
      id="floating-menu"
      className={`${menuClass} h-screen lg:ml-20 bg-white absolute top-0 left-0 right-0 shadow flex-col z-30 pt-20 px-8 lg:p-10`}
    >
      <div className="flex flex-col md:flex-row text-xl md:text-5xl font-sans overflow-y-auto">
        <div className="md:w-1/2 flex-shrink-0 md:border-r border-gray-300 pr-5">
          <ul className="list-none list-inside">
            {data.categories.map((category, index) => (
              <li key={index} className="nav-li">
                <Link to={`/category/${slug(category.title)}`}>
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="list-none list-inside mt-10">
            {links1.map((link, index) => (
              <li key={index} className="nav-li">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2 flex-shrink-0 flex flex-col md:pl-5 mt-10 md:mt-0">
          <ul className="list-none list-inside">
            {links2.map((link, index) => (
              <li key={index} className="nav-li">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
          <ul className="list-none list-inside mt-10">
            {links3.map((link, index) => (
              <li key={index} className="nav-li">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:mx-1 md:px-2 py-2 border-t border-gray-300 mt-auto pt-5">
        <div className="flex flex-col">
          <div className="flex items-center">
            <ul className="flex items-center">
              {socialLinks.map(link => (
                <li className="mr-6">
                  <a href={link.url}>
                    <GatsbyImage
                      image={link.image.asset.gatsbyImageData}
                      className="h-6"
                      objectFit="contain"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href="/privacy"
          className="text-24 leading-28 text-custom-darkblue mt-5 md:mt-auto md:ml-auto"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  )
}

const StateOfMatterSVG = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 216"
      {...props}
      className={`${props.className} fill-current`}
    >
      <path d="M6.6 202.54c-.4.78-.74 1.61-1.02 2.49-.3.88-.45 1.72-.45 2.52 0 1.08.24 1.94.72 2.58.48.62 1.14.93 1.98.93.6 0 1.13-.21 1.59-.63.44-.44.83-1 1.17-1.68.32-.7.63-1.43.93-2.19.24-.66.53-1.31.87-1.95.32-.66.72-1.25 1.2-1.77s1.08-.93 1.8-1.23c.7-.3 1.57-.45 2.61-.45 1.14 0 2.19.29 3.15.87.94.56 1.69 1.38 2.25 2.46s.84 2.39.84 3.93c0 .92-.1 1.82-.3 2.7-.2.86-.47 1.68-.81 2.46-.36.78-.76 1.5-1.2 2.16l-2.73-1.56c.36-.48.69-1.03.99-1.65.3-.62.54-1.26.72-1.92.18-.66.27-1.28.27-1.86 0-.62-.1-1.23-.3-1.83-.22-.62-.56-1.13-1.02-1.53-.46-.42-1.07-.63-1.83-.63-.62 0-1.15.18-1.59.54-.44.34-.82.8-1.14 1.38-.34.58-.64 1.21-.9 1.89-.26.68-.55 1.37-.87 2.07-.32.7-.71 1.36-1.17 1.98-.48.6-1.06 1.09-1.74 1.47-.68.38-1.52.57-2.52.57-1.2 0-2.24-.28-3.12-.84-.88-.56-1.58-1.33-2.1-2.31-.52-1-.8-2.15-.84-3.45 0-1.54.19-2.85.57-3.93.36-1.1.8-2.07 1.32-2.91l2.67 1.32zm-.87-6.541v-3.36h5.58v-3.3h2.64v3.3H24v3.36H13.95v2.19h-2.64v-2.19H5.73zm18.6-15.271c0 1.18-.25 2.26-.75 3.24-.5.96-1.24 1.72-2.22 2.28-1 .56-2.23.84-3.69.84-1.44 0-2.67-.29-3.69-.87-1.04-.6-1.84-1.38-2.4-2.34-.56-.98-.84-2.04-.84-3.18 0-1.22.25-2.2.75-2.94.48-.76 1.04-1.35 1.68-1.77l.48.18-2.34-.33v-3.09H24v3.36h-3.09l.81-.33c.12.06.32.22.6.48.26.24.55.57.87.99.32.42.59.92.81 1.5.22.56.33 1.22.33 1.98zm-2.76-.93c0-.62-.11-1.18-.33-1.68-.22-.5-.53-.92-.93-1.26-.4-.34-.88-.59-1.44-.75h-2.76c-.52.16-.97.42-1.35.78-.4.36-.71.8-.93 1.32-.22.5-.33 1.06-.33 1.68 0 .7.17 1.34.51 1.92.34.56.81 1.02 1.41 1.38.6.34 1.29.51 2.07.51.76 0 1.45-.18 2.07-.54a4.06 4.06 0 001.47-1.44c.36-.6.54-1.24.54-1.92zM5.73 166.907v-3.36h5.58v-3.3h2.64v3.3H24v3.36H13.95v2.19h-2.64v-2.19H5.73zm18.6-16.021c0 1.5-.29 2.78-.87 3.84-.58 1.06-1.38 1.87-2.4 2.43s-2.19.84-3.51.84c-1.26 0-2.4-.32-3.42-.96a6.926 6.926 0 01-2.46-2.58c-.62-1.1-.93-2.31-.93-3.63 0-1.74.51-3.17 1.53-4.29 1-1.14 2.42-1.9 4.26-2.28l3.45 10.23-1.89.78-2.85-8.01.39.72c-.6.2-1.12.55-1.56 1.05-.46.5-.69 1.19-.69 2.07 0 .7.17 1.32.51 1.86.34.54.81.97 1.41 1.29.58.3 1.27.45 2.07.45.84 0 1.57-.17 2.19-.51.6-.34 1.07-.8 1.41-1.38.32-.58.48-1.24.48-1.98 0-.52-.09-1.01-.27-1.47a6.49 6.49 0 00-.72-1.38l2.49-1.53c.42.66.76 1.39 1.02 2.19.24.78.36 1.53.36 2.25zm-6.81-18.496c-1.28 0-2.43-.3-3.45-.9a6.481 6.481 0 01-2.43-2.55c-.6-1.08-.9-2.31-.9-3.69 0-1.42.3-2.65.9-3.69a5.926 5.926 0 012.43-2.43c1.02-.58 2.17-.87 3.45-.87 1.28 0 2.44.29 3.48.87 1.02.56 1.83 1.37 2.43 2.43.6 1.06.9 2.3.9 3.72 0 1.38-.27 2.61-.81 3.69a6.386 6.386 0 01-2.37 2.52c-1.02.6-2.23.9-3.63.9zm.03-3.39c.74 0 1.42-.16 2.04-.48.6-.32 1.08-.76 1.44-1.32.36-.56.54-1.18.54-1.86 0-.74-.18-1.38-.54-1.92-.36-.56-.84-.99-1.44-1.29-.62-.32-1.3-.48-2.04-.48-.76 0-1.44.16-2.04.48-.62.3-1.11.73-1.47 1.29-.36.54-.54 1.18-.54 1.92 0 .7.19 1.33.57 1.89.36.54.84.97 1.44 1.29.6.32 1.28.48 2.04.48zM24 113.59h-9.75v2.16h-2.97v-2.16H6.3c-1.76 0-3.14-.44-4.14-1.32-1.02-.9-1.53-2.2-1.53-3.9 0-.48.07-1.01.21-1.59.14-.58.36-1.09.66-1.53l2.43 1.41c-.2.2-.34.42-.42.66-.08.24-.12.47-.12.69 0 .68.23 1.22.69 1.62.46.4 1.23.6 2.31.6h4.89v-3.96h2.97v3.96H24v3.36zm0-21.26H1.38v-.03l16.65-11.76-.33 1.5-16.32-11.7v-.06H24v3.48H9.27l1.77-.24 11.19 7.92v.06l-11.19 8.04-1.62-.6H24v3.39zm.33-32.657c0 1.18-.25 2.26-.75 3.24-.5.96-1.24 1.72-2.22 2.28-1 .56-2.23.84-3.69.84-1.44 0-2.67-.29-3.69-.87-1.04-.6-1.84-1.38-2.4-2.34-.56-.98-.84-2.04-.84-3.18 0-1.22.25-2.2.75-2.94.48-.76 1.04-1.35 1.68-1.77l.48.18-2.34-.33v-3.09H24v3.36h-3.09l.81-.33c.12.06.32.22.6.48.26.24.55.57.87.99.32.42.59.92.81 1.5.22.56.33 1.22.33 1.98zm-2.76-.93c0-.62-.11-1.18-.33-1.68-.22-.5-.53-.92-.93-1.26-.4-.34-.88-.59-1.44-.75h-2.76c-.52.16-.97.42-1.35.78-.4.36-.71.8-.93 1.32-.22.5-.33 1.06-.33 1.68 0 .7.17 1.34.51 1.92.34.56.81 1.02 1.41 1.38.6.34 1.29.51 2.07.51.76 0 1.45-.18 2.07-.54a4.06 4.06 0 001.47-1.44c.36-.6.54-1.24.54-1.92zM5.73 45.853v-3.36h5.58v-3.3h2.64v3.3H24v3.36H13.95v2.19h-2.64v-2.19H5.73zm0-11.192v-3.36h5.58v-3.3h2.64v3.3H24v3.36H13.95v2.19h-2.64v-2.19H5.73zm18.6-16.021c0 1.5-.29 2.78-.87 3.84-.58 1.06-1.38 1.87-2.4 2.43s-2.19.84-3.51.84c-1.26 0-2.4-.32-3.42-.96a6.926 6.926 0 01-2.46-2.58c-.62-1.1-.93-2.31-.93-3.63 0-1.74.51-3.17 1.53-4.29 1-1.14 2.42-1.9 4.26-2.28l3.45 10.23-1.89.78-2.85-8.01.39.72c-.6.2-1.12.55-1.56 1.05-.46.5-.69 1.19-.69 2.07 0 .7.17 1.32.51 1.86.34.54.81.97 1.41 1.29.58.3 1.27.45 2.07.45.84 0 1.57-.17 2.19-.51.6-.34 1.07-.8 1.41-1.38.32-.58.48-1.24.48-1.98 0-.52-.09-1.01-.27-1.47a6.49 6.49 0 00-.72-1.38l2.49-1.53c.42.66.76 1.39 1.02 2.19.24.78.36 1.53.36 2.25zM11.31 5.674l3.6-.3-.51.12a5.57 5.57 0 01-1.95-1.44c-.54-.64-.96-1.29-1.26-1.95-.3-.68-.45-1.23-.45-1.65l3.36.15c-.08.96.09 1.8.51 2.52.42.7.99 1.25 1.71 1.65.7.4 1.44.6 2.22.6H24v3.33H11.31v-3.03z"></path>
    </svg>
  )
}

const CurrentIssueSVG = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FF5757"
      viewBox="0 0 22 169"
      {...props}
      className={`${props.className} fill-current`}
    >
      <path d="M19.404 152.08c.205.299.457.747.756 1.344.299.579.56 1.279.784 2.1.205.803.299 1.699.28 2.688-.019 1.587-.299 3.015-.84 4.284-.56 1.269-1.307 2.343-2.24 3.22a10.512 10.512 0 01-3.248 2.044c-1.232.467-2.539.7-3.92.7-1.55 0-2.968-.243-4.256-.728-1.288-.485-2.399-1.176-3.332-2.072a9.339 9.339 0 01-2.212-3.192c-.523-1.232-.784-2.576-.784-4.032 0-1.288.177-2.436.532-3.444.336-1.027.719-1.885 1.148-2.576l3.052 1.288c-.355.523-.71 1.176-1.064 1.96-.355.784-.532 1.671-.532 2.66 0 .896.187 1.755.56 2.576.355.821.868 1.54 1.54 2.156a7.709 7.709 0 002.296 1.484c.877.355 1.83.532 2.856.532 1.064 0 2.044-.159 2.94-.476a7.097 7.097 0 002.324-1.4 6.932 6.932 0 001.512-2.184c.355-.859.532-1.82.532-2.884 0-1.045-.159-1.96-.476-2.744-.336-.803-.71-1.447-1.12-1.932l2.912-1.372zm2.1-7.513c0 1.083-.327 1.979-.98 2.688-.672.71-1.53 1.083-2.576 1.12H9.156v-3.136h7.672c.579-.037 1.055-.205 1.428-.504.373-.298.56-.774.56-1.428 0-.616-.187-1.157-.56-1.624-.392-.485-.924-.868-1.596-1.148-.672-.28-1.428-.42-2.268-.42H9.156v-3.136H21v2.828l-2.604.252.392-.084c.523.243.99.588 1.4 1.036.41.448.728.98.952 1.596.243.598.364 1.251.364 1.96zM9.156 129.852l3.36-.28-.476.112a5.19 5.19 0 01-1.82-1.344 7.913 7.913 0 01-1.176-1.82c-.28-.635-.42-1.148-.42-1.54l3.136.14c-.075.896.084 1.68.476 2.352a4.216 4.216 0 001.596 1.54c.653.373 1.344.56 2.072.56H21v3.108H9.156v-2.828zm0-10.91l3.36-.28-.476.112a5.215 5.215 0 01-1.82-1.344 7.935 7.935 0 01-1.176-1.82c-.28-.635-.42-1.148-.42-1.54l3.136.14c-.075.896.084 1.68.476 2.352a4.223 4.223 0 001.596 1.54c.653.373 1.344.56 2.072.56H21v3.108H9.156v-2.828zm12.152-13.219c0 1.4-.27 2.595-.812 3.584-.541.989-1.288 1.745-2.24 2.268-.952.523-2.044.784-3.276.784-1.176 0-2.24-.299-3.192-.896a6.462 6.462 0 01-2.296-2.408c-.579-1.027-.868-2.156-.868-3.388 0-1.624.476-2.959 1.428-4.004.933-1.064 2.259-1.773 3.976-2.128l3.22 9.548-1.764.728-2.66-7.476.364.672a3.311 3.311 0 00-1.456.98c-.43.467-.644 1.111-.644 1.932 0 .653.159 1.232.476 1.736.317.504.756.905 1.316 1.204.541.28 1.185.42 1.932.42.784 0 1.465-.159 2.044-.476.56-.317.999-.747 1.316-1.288.299-.541.448-1.157.448-1.848 0-.485-.084-.943-.252-1.372a6.064 6.064 0 00-.672-1.288l2.324-1.428c.392.616.71 1.297.952 2.044.224.728.336 1.428.336 2.1zM9.156 93.621l2.548-.251-.336.084c-.821-.392-1.475-1-1.96-1.82-.504-.822-.756-1.793-.756-2.912 0-1.12.327-2.044.98-2.772.653-.728 1.512-1.102 2.576-1.12H21v3.136h-7.672c-.597.018-1.073.186-1.428.504-.373.317-.57.82-.588 1.511 0 .635.196 1.205.588 1.709.373.504.896.905 1.568 1.204.653.28 1.41.42 2.268.42H21v3.136H9.156V93.62zm-5.208-14.26v-3.137h5.208v-3.08h2.464v3.08H21v3.136h-9.38v2.044H9.156V79.36H3.948zM.616 60.45v-3.276H21v3.276H.616zm20.636-11.799c0 .896-.159 1.755-.476 2.576a5.165 5.165 0 01-1.4 2.016l-1.764-1.316c.504-.522.877-1.036 1.12-1.54.224-.522.336-1.017.336-1.484a3.7 3.7 0 00-.112-.952c-.093-.298-.233-.532-.42-.7-.187-.186-.439-.28-.756-.28-.373 0-.663.13-.868.392-.224.262-.401.598-.532 1.008-.15.41-.29.85-.42 1.316-.336 1.008-.803 1.764-1.4 2.268a3.264 3.264 0 01-2.128.756 3.527 3.527 0 01-1.764-.476c-.579-.317-1.055-.802-1.428-1.456-.373-.653-.56-1.474-.56-2.464 0-.896.103-1.67.308-2.324a5.828 5.828 0 01.98-1.876l1.904 1.204a3.22 3.22 0 00-.756 1.204c-.187.448-.29.859-.308 1.232-.019.336.028.635.14.896.093.262.233.476.42.644a.934.934 0 00.644.252c.373 0 .672-.13.896-.392.224-.28.401-.634.532-1.064.13-.43.27-.858.42-1.288a5.13 5.13 0 01.7-1.512 3.487 3.487 0 011.092-1.064c.41-.261.924-.392 1.54-.392.71 0 1.381.178 2.016.532.616.355 1.11.887 1.484 1.596.373.71.56 1.606.56 2.688zm0-11.84c0 .896-.159 1.755-.476 2.576a5.164 5.164 0 01-1.4 2.016l-1.764-1.316c.504-.522.877-1.036 1.12-1.54.224-.522.336-1.017.336-1.484a3.7 3.7 0 00-.112-.952c-.093-.298-.233-.532-.42-.7-.187-.186-.439-.28-.756-.28-.373 0-.663.131-.868.392-.224.262-.401.598-.532 1.008-.15.411-.29.85-.42 1.316-.336 1.008-.803 1.764-1.4 2.268a3.264 3.264 0 01-2.128.756 3.526 3.526 0 01-1.764-.476c-.579-.317-1.055-.802-1.428-1.456-.373-.653-.56-1.474-.56-2.464 0-.896.103-1.67.308-2.324a5.83 5.83 0 01.98-1.876l1.904 1.204a3.221 3.221 0 00-.756 1.204c-.187.448-.29.86-.308 1.232-.019.336.028.635.14.896.093.262.233.476.42.644a.934.934 0 00.644.252c.373 0 .672-.13.896-.392.224-.28.401-.634.532-1.064.13-.429.27-.858.42-1.288a5.132 5.132 0 01.7-1.512 3.488 3.488 0 011.092-1.064c.41-.26.924-.392 1.54-.392.71 0 1.381.178 2.016.532.616.355 1.11.887 1.484 1.596.373.71.56 1.606.56 2.688zm.252-12.091c0 1.082-.327 1.978-.98 2.688-.672.709-1.53 1.082-2.576 1.12H9.156v-3.136h7.672c.579-.038 1.055-.206 1.428-.504.373-.3.56-.775.56-1.428 0-.616-.187-1.158-.56-1.624-.392-.486-.924-.868-1.596-1.148-.672-.28-1.428-.42-2.268-.42H9.156v-3.136H21v2.828l-2.604.252.392-.084c.523.242.99.588 1.4 1.036.41.448.728.98.952 1.596.243.597.364 1.25.364 1.96zm-.196-17.544c0 1.4-.27 2.595-.812 3.584-.541.99-1.288 1.746-2.24 2.268-.952.523-2.044.784-3.276.784-1.176 0-2.24-.298-3.192-.896a6.465 6.465 0 01-2.296-2.408c-.579-1.026-.868-2.156-.868-3.388 0-1.624.476-2.958 1.428-4.004.933-1.064 2.259-1.773 3.976-2.128l3.22 9.548-1.764.728-2.66-7.476.364.672a3.311 3.311 0 00-1.456.98c-.43.467-.644 1.11-.644 1.932 0 .654.159 1.232.476 1.736.317.504.756.906 1.316 1.204.541.28 1.185.42 1.932.42.784 0 1.465-.158 2.044-.476.56-.317.999-.746 1.316-1.288.299-.541.448-1.157.448-1.848 0-.485-.084-.942-.252-1.372a6.057 6.057 0 00-.672-1.288l2.324-1.428c.392.616.71 1.298.952 2.044.224.728.336 1.428.336 2.1z"></path>
    </svg>
  )
}

const MenuButtonSVG = props => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 30 20"
      fill="current"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 20H30V16.6667H0V20ZM0 11.6667H30V8.33333H0V11.6667ZM0 0V3.33333H30V0H0Z"
        fill="#FF5757"
      />
    </svg>
  )
}

export default Layout
