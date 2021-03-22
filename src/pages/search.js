import React from 'react';
import Layout from '../components/layout';

export default function Search() {
  return <Layout header={<HeaderContent />} sidebar={<SidebarContent />} body={<BodyContent/>}/>;
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-6xl">Search</h1>
    </>
  );
};

const SidebarContent = () => {
  return (
    <div className="text-3xl flex flex-col">
      <h2 className="text-5xl mb-5">Filters</h2>
      <div className="py-3">Year</div>
      <div className="py-3">Tags</div>
      <div className="py-3">Fiction</div>
      <div className="py-3">Author</div>
      <div className="py-3">Nationality</div>
    </div>
  );
};

const BodyContent = () => {
  return (
    <div>
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
  );
};

const Post = () => {
  return (
    <div className="flex items-center justify-between px-16 py-5 border-b border-gray-400">
      <div className="flex flex-col">
        <h2 className="text-4xl">A Spaceship named Becky</h2>
        <div className="flex items-center py-1">
          <span className="border-gray-700 border-r pr-3">Fiction</span>
          <span className="px-3">Suchitra Sukumar</span>
          <span className="border-gray-700 border-l pl-3">India</span>
        </div>
      </div>
      <div className="flex flex-col pl-20">
        <div className="flex items-center py-1">
          <span className="border-gray-700 border-r pr-3">Science Fiction</span>
          <span className="px-3">Adventure</span>
          <span className="border-gray-700 border-l pl-3">Aliens</span>
        </div>
      </div>
    </div>
  );
};

