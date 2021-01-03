import React from 'react';
import TodoApp from './components/TodoApp';

import styled from '@emotion/styled';

// import { FontAwesomeIcon } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab, fas, far);

function App() {
  const Container = styled.div`
    ${'' /* height: 100%; */}
    display: flex;
    ${'' /* align-items: center; */}
    justify-content: center;
  `;

  return (
    <>
      <Container>
        <TodoApp />
      </Container>
    </>
  );
}

export default App;
