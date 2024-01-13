import { useState } from 'react';
import './UserInput.css';

const UserInput = (props) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setMyDescription] = useState('');

  const onDateChangeHandler = (event) => {
    setDate(event.target.value);
  };

  const onTitleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChangeHandler = (event) => {
    setMyDescription(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const taskData = {
      title: title,
      date: date,
      description: description,
      listId: Math.random().toString(),
    };

    props.onAddTask(taskData);

    setTitle('');
    setDate('');
    setMyDescription('');
  };

  return (
    <form
      className="listuserinput"
      onSubmit={formSubmissionHandler}
      name="User Input"
      id="User Input"
    >
      <div className="input-item">
        <label>Date:</label>
        <input
          type="date"
          min="2000-01-01"
          max="2099-12-31"
          value={date}
          onChange={onDateChangeHandler}
          required
        />
      </div>
      <div className="input-item">
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={onTitleChangeHandler}
          required
        />
      </div>
      <div className="input-item">
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={onDescriptionChangeHandler}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInput;
