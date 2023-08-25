import './ListItem.css';

const ListItem = (props) => {
  const onDelete = () => {
    props.deleteHandler(props.id);
    console.log(props.id);
  };

  const onUpdate = () => {
    props.updateHandler(props.status);
  };

  if (props.status === 'Pending') {
    return (
      <div className="list" style={{ background: 'green' }}>
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <button className="btn" onClick={onDelete}>
          Delete
        </button>
        <br />
        <button className="btn" onClick={onUpdate}>
          Complete
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <button onClick={onDelete}>Delete</button>
        <br />
        <button onClick={onUpdate}>pending</button>
      </div>
    );
  }
};

export default ListItem;
