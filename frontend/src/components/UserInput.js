import { useState } from 'react';

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
    };

    props.onAddTask(taskData);

    setMyTask('');
    setTheDate('');
    setMyDescription('');
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <label>Date</label>
      <input
        type="date"
        value={theDate}
        onChange={onDateChangeHandler}
        required
      />
      <label>Title</label>
      <input
        type="text"
        value={myTask}
        onChange={onTitleChangeHandler}
        required
      />
      <label>Description</label>
      <input
        type="text"
        value={myDescription}
        onChange={onDescriptionChangeHandler}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserInput;
