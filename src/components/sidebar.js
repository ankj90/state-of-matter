import React from 'react';

const Sidebar = ({ children }) => {
  return (
    <div id="home-cat" className="col-span-12 lg:col-span-3 flex flex-col px-10 py-8 lg:py-16 overflow-y-auto">
      {children}
    </div>
  );
};

export default Sidebar;
