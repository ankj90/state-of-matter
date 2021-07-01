import React from "react"
import slug from "slug"
import { Link } from "gatsby"

export const PostListItem = ({ data }) => {
  return (
    <a
      href={`/post/${data.slug.current}`}
      className="flex flex-col xl:flex-row xl:items-end justify-between px-8 lg:px-10 xl:px-16 py-5 border-b border-gray-300 hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col">
        <h2 className="text-3xl md:text-4xl">{data.title}</h2>
        <div className="flex flex-wrap items-center py-1">
          <Link to={`/author/`} className="tag">
            {data.author[0].name}
          </Link>
        </div>
      </div>
      <div className="hidden md:flex flex-col xl:pl-20">
        <div className="flex flex-wrap items-center py-1">
          {data.tags.map(tag => (
            <Link to={`/tag/${slug(tag.title)}`} className="tag" key={tag.id}>
              {tag.title}
            </Link>
          ))}
        </div>
      </div>
    </a>
  )
}
