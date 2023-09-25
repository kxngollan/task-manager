import React from 'react';
import ListDate from './ListDate';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
  };

  const onUpdate = () => {
    props.updateHandler(props.myStatus, props.id);
  };

  return (
    <div
      className="list-item"
      style={{
        background: props.myStatus === 'Complete' ? 'green' : '',
      }}
    >
      <ListDate date={props.date} />
      <div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onUpdate}>{props.myStatus}</button>
      </div>
    </div>
  );
};

export default ListItem;
