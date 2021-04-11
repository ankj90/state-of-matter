import React from 'react';

// import { StaticImage } from "gatsby-plugin-image"
// import Image from 'next/image';

const Header = ({ content }) => {
  return (
    <header className="relative overflow-hidden flex-shrink-0 text-white">
      <div className="p-8 md:p-12 flex flex-col z-10 relative">{content}</div>
      <img src={'tree-bg.jpg'} alt="Header Background Image" className="absolute inset-0 h-full w-full object-cover z-0" />
    </header>
  );
};

export default Header;
