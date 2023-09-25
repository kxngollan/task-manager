import { useState } from 'react';
import './UserInput.css';

const UserInput = (props) => {
  const [myTask, setMyTask] = useState('');
  const [theDate, setTheDate] = useState('');
  const [myDescription, setMyDescription] = useState('');

  const onDateChangeHandler = (event) => {
    setTheDate(event.target.value);
  };

  const onTitleChangeHandler = (event) => {
    setMyTask(event.target.value);
  };

  const onDescriptionChangeHandler = (event) => {
    setMyDescription(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    const taskData = {
      title: myTask,
      date: theDate,
      description: myDescription,
      id: Math.random().toString(),
      status: 'Pending',
    };

    props.onAddTask(taskData);

    setMyTask('');
    setTheDate('');
    setMyDescription('');
  };

  return (
    <form className="listuserinput" onSubmit={formSubmissionHandler}>
      <div className="input-item">
        <label>Date:</label>
        <input
          type="date"
          value={theDate}
          onChange={onDateChangeHandler}
          required
        />
      </div>
      <div className="input-item">
        <label>Title:</label>
        <input
          type="text"
          value={myTask}
          onChange={onTitleChangeHandler}
          required
        />
      </div>
      <div className="input-item">
        <label>Description:</label>
        <input
          type="text"
          value={myDescription}
          onChange={onDescriptionChangeHandler}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInput;
