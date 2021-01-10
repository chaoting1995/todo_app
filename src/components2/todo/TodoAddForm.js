import React from 'react';

function TodoAddForm(props) {
  // 解構賦值的語法，先把要用的變數值從props解出來
  const { todoInput, setTodoInput, todos, setTodos } = props;

  return (
    <>
      <input
        type="text"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        onKeyPress={(e) => {
          //處理按下Enter
          if (e.key === 'Enter' && e.target.value) {
            // 建立一個新的todo項目
            const newItem = {
              id: +new Date(),
              text: e.target.value,
              completed: false,
              edited: false,
            };

            // 建立新的陣列(合併原本的todos陣列中的值)
            const newTodos = [newItem, ...todos];

            // 設定todos狀態值
            setTodos(newTodos);

            // 清空輸入框
            setTodoInput('');
          }
        }}
      />
    </>
  );
}

export default TodoAddForm;
