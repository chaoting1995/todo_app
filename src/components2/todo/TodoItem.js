import React from 'react'

function TodoItem(props) {
  /*
    todos={todos}
        handleEditedToggle={handleEditedToggle}
        handleCompleted={handleCompleted}
        handleDelete={handleDelete}
        handleEditedSave={handleEditedSave}
        */
  // 解構賦值的語法，先把要用的變數值從props解出來
  //   const {
  //     text,
  //     completed,
  //     completedMethod,
  //     deleteMethod,
  //     editedToggleMethod,
  //   } = props
  const {
    todo,
    // todos,
    handleEditedToggle,
    handleCompleted,
    handleDelete,
    // handleEditedSave,
  } = props

  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCompleted(todo.id)}
        />
        {/* 用completed來判斷是否要有刪除線，true則要有 */}
        {todo.completed ? <del>{todo.text}</del> : todo.text}
        <button onClick={() => handleEditedToggle(todo.id)}>編輯</button>
        <button onClick={() => handleDelete(todo.id)}>刪除</button>
      </li>
    </>
  )
}

export default TodoItem
