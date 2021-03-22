import React from 'react';

import Sidebar from './sidebar';
import ContentArea from './contentArea';

const Body = ({ sidebar, body }) => {
  return (
    <main className="grid grid-cols-12 h-full lg:overflow-hidden">
      <Sidebar>{sidebar}</Sidebar>
      <ContentArea>{body}</ContentArea>
    </main>
  );
};

export default Body;
