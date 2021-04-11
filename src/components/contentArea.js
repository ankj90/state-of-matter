import React from 'react';

const ContentArea = ({ children }) => {
  return (
    <div id="" className="col-span-12 lg:col-span-9 flex flex-col lg:border-l border-gray-400 lg:overflow-y-auto">
      {children}
    </div>
  );
};

export default ContentArea;
