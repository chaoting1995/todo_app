import React from 'react';

function MainContent(props) {
  return (
    <>
      <main className="flex-shrink-0">
        <div className="container">{props.children}</div>
      </main>
    </>
  );
}

export default MainContent;
