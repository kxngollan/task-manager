import React from 'react';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
  };

  const onUpdateStatus = () => {
    props.updateHandler(props.id, 'Complete');
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
      {props.listStatus === 'Complete' ? (
        <button onClick={onUpdateStatus} disabled>
          Complete
        </button>
      ) : (
        <button onClick={onUpdateStatus}>Complete</button>
      )}
    </div>
  );
};

export default ListItem;
