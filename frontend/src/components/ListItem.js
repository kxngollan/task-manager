import React from 'react';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
  };
  return (
    <div
      style={{
        background: props.listStatus === 'Complete' ? 'green' : '',
      }}
    >
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <p>{props.description}</p>
      <button onClick={onDelete}>Delete</button>
      <br />
      {props.listStatus !== 'Complete' ? (
        <button onClick={props.updateHandler}>{props.myStatus}</button>
      ) : (
        <button onClick={props.updateHandler}>{props.listStatus}</button>
      )}
    </div>
  );
};

export default ListItem;
