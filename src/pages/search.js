import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { PostListItem } from "../components/post-list-item"
import { graphql } from "gatsby"
import Post from "../templates/post"
import { data } from "autoprefixer"

const removeDuplicatesById = arr => {
  return arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i) //Remove duplicates by id
}

const Search = ({ data }) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }
  const posts = data.allSanityPost.nodes
  const tags = removeDuplicatesById(posts.map(post => post.tags).flat())
  const categories = removeDuplicatesById(
    posts.map(post => post.category).flat()
  )
  const years = posts
    .map(post => (post.date ? post.date.split("-")[0] : ""))
    .filter(onlyUnique)
    .map((item, index) => ({ id: index, title: item }))
  const [activeTags, setActiveTags] = useState([])
  const [activeYears, setActiveYears] = useState([])
  const [activeCategories, setActiveCategories] = useState([])
  const [activePosts, setActivePosts] = useState({})
  const [finalPosts, setFinalPosts] = useState(posts)

  const filterData = [
    {
      title: "Tags",
      arr: tags,
      activeItems: activeTags,
      setActiveItems: setActiveTags,
      findIn: "tags",
      findFunc: function (tag) {
        return tag.id === this.itemToSearch.id
      },
    },
    {
      title: "Categories",
      arr: categories,
      activeItems: activeCategories,
      setActiveItems: setActiveCategories,
      findIn: "category",
      findFunc: function (cat) {
        return cat.id === this.itemToSearch.id
      },
    },
  ]

  useEffect(() => {
    if (activeTags.length === 0 && activeCategories.length === 0) {
      setFinalPosts(posts)
      setActivePosts({})
    } else {
      filterData.forEach(filter => {
        if (filter.activeItems.length > 0) {
          const itemsToAdd = removeDuplicatesById(
            filter.activeItems
              .map(itemToSearch =>
                posts.filter(post =>
                  post[filter.findIn].find(filter.findFunc, { itemToSearch })
                )
              )
              .flat()
          )
          setActivePosts(prevState => ({
            ...prevState,
            [filter.title]: itemsToAdd,
          }))
        } else {
          setActivePosts(prevState => ({
            ...prevState,
            [filter.title]: [],
          }))
        }
      })
    }
  }, [activeTags, activeCategories])

  return (
    <Layout
      header={<HeaderContent />}
      sidebar={<SidebarContent data={filterData} />}
      body={<BodyContent data={finalPosts} test={activePosts} />}
    />
  )
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-6xl">Search</h1>
    </>
  )
}

const SidebarContent = ({ data }) => {
  const filters = ["Year", "Fiction", "Author", "Nationality", "Tags"]
  return (
    <div className="text-3xl flex flex-col px-10 lg:px-0">
      <div className="py-3 flex flex-col items-start text-left">
        {data.map(filter => (
          <FilterBox {...filter} />
        ))}
      </div>
    </div>
  )
}

const FilterBox = ({ title, arr, activeItems, setActiveItems }) => {
  const [isOpen, setOpen] = useState(false)
  const arrow = isOpen ? "M9 5l7 7-7 7" : "M19 9l-7 7-7-7"
  return (
    <div className="w-full mb-5">
      <button
        className="flex justify-between items-center w-full focus:outline-none bg-custom-lightgray p-2 rounded"
        onClick={() => setOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={arrow}
          />
        </svg>
      </button>
      {isOpen && (
        <div className="flex flex-col items-start mt-3 ml-3">
          {arr.map(item => (
            <button
              className={`text-xl ${
                activeItems.includes(item) ? "filter-active" : ""
              }`}
              key={item.id}
              onClick={() =>
                activeItems.includes(item)
                  ? setActiveItems(activeItems.filter(i => i !== item))
                  : setActiveItems([...activeItems, item])
              }
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const BodyContent = ({ data, test }) => {
  // console.log(
  //   test,
  //   Object.values(test).reduce(
  //     (a, b) => b.filter(Set.prototype.has, new Set(a)),
  //     []
  //   )
  // )
  return (
    <div>
      {/* {data.map(post => (
        <PostListItem data={post} />
      ))} */}
    </div>
  )
}

export const query = graphql`
  query SearchPageQuery {
    allSanityPost {
      nodes {
        id
        date
        title
        slug {
          current
        }
        category {
          id
          title
        }
        author {
          id
          name
          nationality
        }
        tags {
          id
          title
        }
        date
      }
    }
  }
`
export default Search
