import { useState } from 'react';
import ListResults from './components/ListResults';
import UserInput from './components/UserInput';
import './App.css';

const taskArray = [];

const App = () => {
  // This is not working
  //   const sortedTasksArray = [...taskArray].sort(
  //     (taskA, taskB) => new Date(taskA.date) - new Date(taskB.date)
  //   );
  const [tasks, setTasks] = useState(taskArray);

  const onSubmitHandler = (task) => {
    setTasks((prevTasks) => {
      return [task, ...prevTasks];
    });
  };

  const onDeleteItemHandler = (taskId) => {
    setTasks((prevTasks) => {
      let updateTasks = prevTasks.filter((task) => task.id !== taskId);
      return updateTasks;
    });
  };

  return (
    <div className="">
      <UserInput onAddTask={onSubmitHandler} />
      <ListResults tasks={tasks} onDeleteItem={onDeleteItemHandler} />
    </div>
  );
};

export default App;
