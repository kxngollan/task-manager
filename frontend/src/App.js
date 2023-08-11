import { useEffect, useState } from 'react';
import ListResults from './components/ListResults';
import UserInput from './components/UserInput';
import './App.css';

const App = () => {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setBackendData(data.backendTasks));
  }, []); // This is my data fetch.

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(backendData);
  }, [backendData]); // So it should render everytime that backendData is fetched... So Ideally once.

  const sortedTasks = [...tasks].sort(
    (taskA, taskB) => new Date(taskA.date) - new Date(taskB.date)
  );

  const onSubmitHandler = (task) => {
    setTasks((prevTasks) => {
      return [task, ...prevTasks];
    });
  };

  const onDeleteItemHandler = (taskId) => {
    setTasks((prevTasks) => {
      let updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div className="">
      <UserInput onAddTask={onSubmitHandler} />
      <ListResults tasks={sortedTasks} onDeleteItem={onDeleteItemHandler} />
    </div>
  );
};

export default App;
