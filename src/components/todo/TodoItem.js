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
        {todoItem.address && <span>Address:{todoItem.address}</span>}
        <div>
          memo created at :<span> </span>
          {new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(dayjs(todoItem.createdAt))}
        </div>

        <div className="cross" onClick={() => handleDelete(todoItem.id)}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </div>
      </li>
    </>
  );
}

export default TodoItem;
