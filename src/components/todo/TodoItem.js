import React from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';

function TodoItem(props) {
  const { todoItem, handleDelete } = props;
  const CrossIcon = styled.div`
    svg {
      color: #faf;
      width: 100px;
      height: 100px;
    }
  `;
  return (
    <>
      <li>
        <div>{todoItem.memo}</div>
        <div>
          createdAt:
          {new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }).format(dayjs(todoItem.createdAt))}
        </div>
        <div>address:{todoItem.address}</div>
        <CrossIcon>
          <div className="icon" onClick={() => handleDelete(todoItem.id)}>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </CrossIcon>
      </li>
    </>
  );
}

export default TodoItem;
