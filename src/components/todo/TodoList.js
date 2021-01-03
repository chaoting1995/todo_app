import React from 'react';
import TodoItem from './TodoItem';
import TodoItemEditForm from './TodoItemEditForm';

function TodoList(props) {
  const { todoItems } = props;

  return (
    <>
      <ul>
        {todoItems.map((item, index) =>
          item.edited ? (
            <TodoItemEditForm key={item.id} todoItem={item} {...props} />
          ) : (
            <TodoItem key={item.id} todoItem={item} {...props} />
          )
        )}
      </ul>
    </>
  );
}

export default TodoList;
