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
      className={`list ${props.listStatus === 'Complete' ? 'complete' : ''}`}
    >
      <h1>{props.title}</h1>
      <p>{props.date}</p>
      <p>{props.description}</p>
      <button className="btn" onClick={onDelete}>
        Delete
      </button>
      <br />
      {props.listStatus === 'Complete' ? (
        <button className="btn" onClick={onUpdateStatus} disabled>
          Complete
        </button>
      ) : (
        <button className="btn" onClick={onUpdateStatus}>
          Complete
        </button>
      )}
    </div>
  );
};

export default ListItem;
