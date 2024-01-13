import React from 'react';
import ListItem from './ListItem';
import './ListResults.css';

const ListResults = (props) => {
  if (props.items.length === 0) {
    return <h2 className="fallback">Enter a task</h2>;
  } else {
    return (
      <ul className="todo-list" id="todo-list">
        {props.items.map((item) => (
          <ListItem
            key={item.listId}
            listId={item.listId}
            title={item.title}
            description={item.description}
            listStatus={item.listStatus}
            date={new Date(item.date)}
            deleteHandler={props.onDeleteItem}
            updateHandler={props.onUpdateItem}
          />
        ))}
      </ul>
    );
  }
};

export default ListResults;
