// ListResults.js
import React from 'react';
import ListItem from './ListItem';

const ListResults = (props) => {
  if (props.tasks.length === 0) {
    return <h2>Enter a task</h2>;
  } else {
    return (
      <ul>
        {props.tasks.map((sortedTasks) => (
          <ListItem
            id={sortedTasks.id}
            date={sortedTasks.date.toDateString()}
            title={sortedTasks.title}
            description={sortedTasks.description}
            status={sortedTasks.status}
            deleteHandler={props.onDeleteItem}
            updateHandler={props.onUpdateItem}
          />
        ))}
      </ul>
    );
  }
};

export default ListResults;
