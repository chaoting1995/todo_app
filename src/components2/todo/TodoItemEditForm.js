import React, { useState } from 'react'

function TodoItemEditForm(props) {
  // 解構賦值的語法，先把要用的變數值從props解出來
//   const { id, text, handleEditedSave } = props
  const {
    todo,
    // todos,
    // handleEditedToggle,
    // handleCompleted,
    // handleDelete,
    handleEditedSave,
  } = props

  const [editText, setEditText] = useState(todo.text)

  return (
    <>
      <li>
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <button onClick={() => handleEditedSave(todo.id, editText)}>儲存</button>
      </li>
    </>
  )
}

export default TodoItemEditForm
