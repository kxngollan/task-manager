import React from 'react';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
  };

  const onUpdate = () => {
    props.updateHandler(props.myStatus, props.id);
  };

  return (
    <div
      style={{
        background: props.myStatus === 'Complete' ? 'green' : '',
      }}
    >
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <p>{props.description}</p>
      <button onClick={onDelete}>Delete</button>
      <br />
      <button onClick={onUpdate}>{props.myStatus}</button>
    </div>
  );
};

export default ListItem;
