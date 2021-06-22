import React from "react"
export const PostListItem = ({ data }) => {
  return (
    <a
      href={`/post/${data.slug.current}`}
      className="flex flex-col xl:flex-row xl:items-center justify-between px-10 xl:px-16 py-5 border-b border-gray-300 hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col">
        <h2 className="text-4xl">{data.title}</h2>
        <div className="flex items-center py-1">
          {data.category.map(c => (
            <span
              className="bg-gray-100 border-r px-3 rounded-full mr-2"
              key={c.id}
            >
              {c.title}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col xl:pl-20">
        <div className="flex items-center py-1">
          {data.tags.map(tag => (
            <span
              className="bg-gray-100 border-r px-3 rounded-full mr-2"
              key={tag.id}
            >
              {tag.title}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
