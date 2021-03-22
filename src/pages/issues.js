import React from 'react';
import Layout from '../components/layout';

export default function Issues() {
  return <Layout header={<HeaderContent />} sidebar={<SidebarContent />} body={<BodyContent/>}/>;
}

const HeaderContent = () => {
  return (
    <>
      <h1 className="text-6xl">Issues</h1>
    </>
  );
};

const SidebarContent = () => {
  return (
    <div className="text-2xl lg:text-3xl flex flex-row lg:flex-col items-center overflow-x-auto">
      <h2 className="text-4xl lg:text-5xl lg:mb-5 mr-3">Year</h2>
      <div className="px-3 lg:px-0 lg:py-3">2021</div>
      <div className="px-3 lg:px-0 lg:py-3">2022</div>
      <div className="px-3 lg:px-0 lg:py-3">2023</div>
      <div className="px-3 lg:px-0 lg:py-3">2024</div>
      <div className="px-3 lg:px-0 lg:py-3">2025</div>
    </div>
  );
};

const BodyContent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-10 lg:px-16 py-10">
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
      <Issue />
    </div>
  );
};

const Issue = () => {
  return (
    <div><img src="https://via.placeholder.com/225x300/222222/444444?text=Jan" alt="" className="w-full h-full"/></div>
  );
};


