import React from 'react';
import ListItem from './ListItem';
import './ListResults.css';

const ListResults = (props) => {
  if (props.tasks.length === 0) {
    return <h2 className="fallback">Enter a task</h2>;
  } else {
    return (
      <ul className="todo-list">
        {props.tasks.map((task) => (
          <ListItem
            key={task.id}
            id={task.id}
            myStatus={task.listStatus}
            date={new Date(task.date)}
            title={task.title}
            description={task.description}
            deleteHandler={props.onDeleteItem}
            updateHandler={props.onUpdateItem}
          />
        ))}
      </ul>
    );
  }
};

export default ListResults;
