import React, { useState, useEffect } from 'react';
import TodoAddForm from './todo/TodoAddForm';
import TodoItem from './todo/TodoItem';

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
    // 開啟載入的指示圖示
    // setDataLoading(true);

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

  //   // 每次todoItems資料有改變，2秒後關閉載入指示
  // useEffect(() => {
  //   setTimeout(() => setDataLoading(false), 1500);
  // }, [todoItems]);

  // const loading = (
  //   <div className="spinner-grow" role="status">
  //     <span className="sr-only">Loading...</span>
  //   </div>
  // );
  // const loading = (
  //   <>
  //     <div className="d-flex justify-content-center">
  //       <div className="spinner-border" role="status">
  //         <span className="sr-only">Loading...</span>
  //       </div>
  //     </div>
  //   </>
  // )

  // const display = <></>;

  //   // 以資料載入的指示狀態來切換要出現的畫面
  //   return dataLoading ? loading : display
  // }
  //----------------------- PUT待辦事項--------------------------//
  async function putTodoToServer(ItemId, editedItem) {
    // 開啟載入的指示圖示
    // setDataLoading(true);

    const url = `http://localhost:5555/todo/${ItemId}`;

    const request = new Request(url, {
      method: 'PUT',
      body: JSON.stringify(editedItem),
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
  //----------------------- DELETE待辦事項--------------------------//
  async function deleteTodoToServer(ItemId, editedItem) {
    // 開啟載入的指示圖示
    // setDataLoading(true);

    const url = `http://localhost:5555/todo/${ItemId}`;

    const request = new Request(url, {
      method: 'DELETE',
      body: JSON.stringify(editedItem),
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

  // 編輯項目－編輯
  const handleEditedToggle = (id) => {
    const newTodoItems = [...todoItems];
    const todoItemIndex = newTodoItems.findIndex((item) => item.id === id);

    if (todoItemIndex !== -1) {
      newTodoItems[todoItemIndex].edited = !newTodoItems[todoItemIndex].edited;
      setTodoItems(newTodoItems);
    }
  };

  // 編輯項目-儲存
  const handleEditedSave = (id, newMemo) => {
    const newTodoItems = [...todoItems];
    const todoItemIndex = newTodoItems.findIndex((item) => item.id === id);
    if (todoItemIndex !== -1) {
      // newTodoItems[todoItemIndex].memo = newMemo;
      // setTodoItems(newTodoItems);
      newTodoItems[todoItemIndex].memo = newMemo;
      const newTodoItem = newTodoItems[todoItemIndex];
      handleEditedToggle(id);
      putTodoToServer(id, newTodoItem);
    }
  };

  // 刪除項目
  const handleDelete = (id) => {
    // const newTodoItems = todoItems.filter((item, index) => item.id !== id);
    // setTodoItems(newTodoItems);
    deleteTodoToServer(id);
  };

  //--------------------------------------------------------------------//

  return (
    <>
      <h1 className="mt-5">範例：待辨事項</h1>
      <TodoAddForm
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        todoItems={todoItems}
        setTodoItems={setTodoItems}
        getTodoFromServer={getTodoFromServer}
      />
      <hr />
      <ul>
        {todoItems.map((item, index) => (
          <TodoItem
            key={item.id}
            todoItem={item}
            handleDelete={handleDelete}
            {...props}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoApp;
