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
      padding: 20px 20px 30px 20px;
      border-radius: 10px;
      position: relative;
      background-color: #ededed9a;
    }
    li:hover {
      background-color: #f9f9f9;
      box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
      transition: 0.3s;
    }
    li svg {
      ${'' /* display: block; */}
      display: none;
      position: absolute;
      top: -7px;
      right: -10px;
      color: #e56a77;
      font-size: 30px;
      cursor: pointer;
      transition: 0.3s;
    }
    li:hover .cross > svg {
      display: block;

      transition: 0.3s;
    }
    li svg:active {
      color: #c55661;
      font-size: 35px;
      transition: 0s;
    }
    h1 {
      margin-top: 5px;
    }
    li div:first-child {
      font-size: 18px;
      word-break: normal;
      word-wrap: break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      transition: 0.3s;
      margin-bottom: 10px;
    }
    li:hover :first-child {
      text-overflow: clip;
      overflow: visible;
      white-space: normal;
      transition: 0.3s;
    }
    li span {
      font-size: 14px;
      margin-bottom: 10px;
    }
    li :nth-last-child(2) {
      font-size: 12px;
      float: right;
      color: #858585;
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
