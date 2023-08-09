import { useState } from 'react';
import './ListItem.css';

const ListItem = (props) => {
  const [complete, setComplete] = useState(false);
  const onDelete = () => {
    props.deleteHandler(props.id);
  };
  const onComplete = () => {
    setComplete(!complete);
  };
  if (complete) {
    return (
      <div className="list" style={{ background: 'green' }}>
        <h1>{props.title}</h1>
        <p>{props.date}</p>
        <p>{props.description}</p>
        <button className="btn" onClick={onDelete}>
          Delete
        </button>
        <br />
        <button className="btn" onClick={onComplete}>
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
        <button onClick={onComplete}>pending</button>
      </div>
    );
  }
};

export default ListItem;
