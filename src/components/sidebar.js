import React from 'react';

const Sidebar = ({ children }) => {
  return (
    <div id="home-cat" className="col-span-12 lg:col-span-3 flex flex-col px-10 pt-8 lg:pt-16">
      {children}
    </div>
  );
};

export default Sidebar;
