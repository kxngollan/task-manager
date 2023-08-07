// ListResults.js
import React from 'react';
import ListItem from './ListItem';

const ListResults = (props) => {
  if (props.tasks.length === 0) {
    return <h2>Enter a task</h2>;
  } else {
    return (
      <ul>
        {props.tasks.map((taskArray) => (
          <ListItem
            id={taskArray.id}
            date={taskArray.date.toDateString()}
            title={taskArray.title}
            description={taskArray.description}
            deleteHandler={props.onDeleteItem}
          />
        ))}
      </ul>
    );
  }
};

export default ListResults;
