import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { PostListItem } from "../components/post-list-item"
import { SanityBlockRenderer } from "../components/sanityBlockRenderer"

const removeDuplicatesById = arr => {
  return arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i) //Remove duplicates by id
}

const Profile = ({ data, pageContext }) => {
  const posts = data.posts.nodes

  const categories = removeDuplicatesById(
    posts.map(post => post.category).flat()
  )
  const sidebarLinks = [{ id: 0, title: "Profile" }, ...categories]
  const [activeLink, setActiveLink] = useState(sidebarLinks[0])

  const bodySection =
    activeLink.title === "Profile" ? (
      <ProfileBody data={data.sanityProfile} />
    ) : (
      <>
        {posts
          .filter(post => post.category.includes(activeLink))
          .map(post => (
            <PostListItem data={post} />
          ))}
      </>
    )

  return (
    <Layout
      header={<HeaderContent title={data.sanityProfile.name} />}
      body={bodySection}
      sidebar={
        <SidebarContent
          buttons={sidebarLinks}
          activeLink={activeLink}
          setActiveLink={setActiveLink}
        />
      }
    />
  )
}

const HeaderContent = ({ title }) => {
  return (
    <div>
      <h1 className="text-5xl text-white">{title}</h1>
    </div>
  )
}

const SidebarContent = ({ buttons, activeLink, setActiveLink }) => {
  return (
    <div className="flex flex-col">
      <ul>
        {buttons.map(b => (
          <li className="sidebar-link">
            <button
              onClick={() => setActiveLink(b)}
              className={`${b.id === activeLink.id ? "text-custom-red" : ""}`}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ProfileBody = ({ data }) => {
  return (
    <div className="px-8 py-8 lg:p-16 text-30 leading-24">
      <h2 className="mb-6">{data.name}</h2>
      <h2>{data.nationality}</h2>
      {data._rawBio && (
        <div className="font-slab mt-16 text-24">
          <SanityBlockRenderer data={data._rawBio} />
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query ProfilePageQuery($id: String) {
    sanityProfile(id: { eq: $id }) {
      id
      name
      nationality
      _rawBio
    }
    posts: allSanityPost(
      filter: { author: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        id
        date
        title
        slug {
          current
        }
        author {
          id
          name
        }
        category {
          id
          title
        }
        tags {
          id
          title
        }
      }
    }
  }
`

export default Profile
