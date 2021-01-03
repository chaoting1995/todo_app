import React, { useState, useEffect } from 'react';
import TodoAddForm from './todo/TodoAddForm';
import TodoItem from './todo/TodoItem';
import styled from '@emotion/styled';

function TodoApp(props) {
  // { id, text: string, completed: bool, edited: bool }
  // {
  //   id: '___AX<num>',
  //   createdAt: new Date(),
  //   memo: 'string',
  //   edited: bool,
  // };
  //-------------------------- 狀態設定----------------------------//
  //輸入項目
  const [todoInput, setTodoInput] = useState('');
  //項目清單
  const [todoItems, setTodoItems] = useState([]);
  // const [dataLoading, setDataLoading] = useState(false);

  //----------------------- GET待辦事項清單------------------------//
  async function getTodoFromServer() {
    const url = 'http://localhost:5555/todo';
    // const url = 'http://localhost:5555/todo?_sort=createdAt&_order=desc';
    const request = new Request(url, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    });
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    setTodoItems(data);
  }
  useEffect(() => {
    getTodoFromServer();
  }, []);

  //----------------------- DELETE待辦事項--------------------------//
  async function deleteTodoToServer(ItemId) {
    // 開啟載入的指示圖示
    // setDataLoading(true);

    const url = `http://localhost:5555/todo/${ItemId}`;

    const request = new Request(url, {
      method: 'DELETE',
      body: JSON.stringify(),
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
  //--------------------------- handler -----------------------------//

  // 刪除項目
  const handleDelete = (id) => {
    deleteTodoToServer(id);
  };

  //-----------------------------style----------------------------------//
  const WeatherCardWrapper = styled.div`
    margin-top: 100px;
    position: relative;
    min-width: 400px;
    box-shadow: 0px 8px 50px rgba(0, 0, 0, 0.15);
    background-color: #f9f9f9;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 30px 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      list-style: none;
      padding-left: 0;
    }
    li {
      box-sizing: border-box;
      margin-bottom: 10px;
      width: 300px;
      padding: 20px 20px;
      border-radius: 10px;
    }
    li:hover {
      background-color: #e8ebed;
    }
    h1 {
      margin-top: 5px;
    }
    input {
      outline: none;
      box-sizing: border-box;
      background-color: #e8ebed;
      border-radius: 10px;
      padding: 0 15px 0 15px;
      height: 45px;
      width: 300px;
      border: none;
    }
    input:hover {
      background-color: #d4d7da;
    }
    input:focus {
      background-color: #f9f9f9;
      border: 2px solid #d4d7da;
    }
  `;

  return (
    <>
      <WeatherCardWrapper>
        <h1>Todos</h1>
        <TodoAddForm
          todoInput={todoInput}
          setTodoInput={setTodoInput}
          todoItems={todoItems}
          setTodoItems={setTodoItems}
          getTodoFromServer={getTodoFromServer}
        />
        <br />
        <ul>
          {todoItems.map((item, index) => (
            <TodoItem
              key={item.id}
              todoItem={item}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </WeatherCardWrapper>
    </>
  );
}

export default TodoApp;
