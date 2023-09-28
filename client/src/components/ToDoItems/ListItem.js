import React from 'react';
import ListDate from './ListDate';
import './ListItem.css';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
  };

  const onUpdate = () => {
    props.updateHandler(props.myStatus, props.id);
  };

  const taskStatus = props.myStatus;

  return (
    <div
      className={
        taskStatus === 'Complete' ? 'list-item-complete list-item' : 'list-item'
      }
    >
      <ListDate date={props.date} taskStatus={taskStatus} />
      <div className="list-item-task">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div
        className={
          taskStatus === 'Complete'
            ? 'list-item-action-complete list-item-action'
            : 'list-item-action'
        }
      >
        <button onClick={onUpdate}>{props.myStatus}</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ListItem;
