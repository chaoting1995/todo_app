import React, { useState, useEffect } from 'react';
import MainContent from './components/MainContent';

import TodoApp from './components/TodoApp';

function App() {
  return (
    <>
      <MainContent>
        <TodoApp />
      </MainContent>
    </>
  );
}

export default App;
