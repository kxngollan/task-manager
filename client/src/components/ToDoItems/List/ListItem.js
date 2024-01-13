import React from 'react';
import ListDate from './ListDate';
import './ListItem.css';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.listId);
  };

  const onUpdate = () => {
    props.updateHandler(props.listStatus, props.listId);
  };

  const listStatus = props.listStatus;

  return (
    <div
      className={
        listStatus === 'Complete' ? 'list-item-complete list-item' : 'list-item'
      }
    >
      <ListDate date={props.date} listStatus={listStatus} />
      <div className="list-item-list">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div
        className={
          listStatus === 'Complete'
            ? 'list-item-action-complete list-item-action'
            : 'list-item-action'
        }
      >
        <button onClick={onUpdate}>{props.listStatus}</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ListItem;
