import React from 'react';

function TodoItem(props) {
  const { todoItem, handleDelete } = props;

  return (
    <>
      <li>
        {todoItem.memo}
        <button onClick={() => handleDelete(todoItem.id)}>刪除</button>
      </li>
    </>
  );
}

export default TodoItem;
