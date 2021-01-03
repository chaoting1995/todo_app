import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function TodoItem(props) {
  const { todoItem, handleDelete } = props;

  return (
    <>
      <li>
        <div>{todoItem.memo}</div>
        {todoItem.address && <span>address:{todoItem.address}</span>}
        <div>
          memo created at:
          {new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(dayjs(todoItem.createdAt))}
        </div>

        <div className="icon" onClick={() => handleDelete(todoItem.id)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      </li>
    </>
  );
}

export default TodoItem;
