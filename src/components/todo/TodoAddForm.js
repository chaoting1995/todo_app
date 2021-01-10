import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import styled from '@emotion/styled';

function TodoAddForm(props) {
  const { todoInput, setTodoInput, getTodoFromServer } = props;

  async function postTodoToServer(newData) {
    // 開啟載入的指示圖示
    // setDataLoading(true);

    const url = 'http://localhost:5555/todo';
    const request = new Request(url, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });

    const response = await fetch(request);
    const data = await response.json();

    console.log(data);
    getTodoFromServer();
  }

  return (
    <>
      {console.log('重新render')}
      <input
        placeholder="type a new memo"
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyPress={(e) => {
          //處理按下Enter
          if (e.key === 'Enter' && e.target.value) {
            const newItem = {
              id: `___AX${+new Date()}`,
              createdAt: new Date(),
              memo: e.target.value,
            };
            postTodoToServer(newItem);
            setTodoInput('');
          }
        }}
      />
    </>
  );
}

export default TodoAddForm;
