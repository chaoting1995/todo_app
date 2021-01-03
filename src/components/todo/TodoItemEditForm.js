import React, { useState } from 'react';

function TodoItemEditForm(props) {
  const { todoItem, handleEditedSave } = props;

  const [editMemo, setEditMemo] = useState(todoItem.memo);

  return (
    <>
      <li>
        <input
          type="text"
          value={editMemo}
          onChange={(e) => setEditMemo(e.target.value)}
        />
        <button
          onClick={() => {
            handleEditedSave(todoItem.id, editMemo);
          }}
        >
          儲存
        </button>
      </li>
    </>
  );
}

export default TodoItemEditForm;
