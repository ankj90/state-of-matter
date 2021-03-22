import React from "react"
import Layout from "../components/layout"

const Index = () => {
  return (
    <Layout
      header={<HeaderContent />}
      sidebar={<SidebarContent />}
      body={<BodyContent />}
    />
  )
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-6xl">Issue 1</h1>
      <span className="text-2xl">March 2021</span>
      <span className="text-2xl">Edited By: Ayush Mukherjee</span>
    </>
  )
}

const SidebarContent = () => {
  return (
    <div className="text-4xl">
      <div className="py-10 text-custom-red">Fiction</div>
      <div className="py-10">Non Fiction</div>
      <div className="py-10">Poetry</div>
    </div>
  )
}

const BodyContent = () => {
  return (
    <div className="border-t border-gray-400">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

const Post = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between px-10 xl:px-16 py-5 border-b border-gray-400">
      <div className="flex flex-col">
        <h2 className="text-4xl">A Spaceship named Becky</h2>
        <div className="flex items-center py-1 font-sub">
          <span className="border-gray-700 border-r pr-3">Fiction</span>
          <span className="px-3">Suchitra Sukumar</span>
          <span className="border-gray-700 border-l pl-3">India</span>
        </div>
      </div>
      <div className="flex flex-col xl:pl-20">
        <div className="flex items-center py-1 font-sub">
          <span className="border-gray-700 border-r pr-3">Science Fiction</span>
          <span className="px-3">Adventure</span>
          <span className="border-gray-700 border-l pl-3">Aliens</span>
        </div>
      </div>
    </div>
  )
}

export default Index;
