import { useEffect, useState } from 'react';
import ListResults from './components/ListResults';
import UserInput from './components/UserInput';
import './App.css';

const App = () => {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => setBackendData(data));
  }, []);

  // task = {id: "something", description: "something"...}
  const [tasks, setTasks] = useState([
    {
      title: 'adssad',
      date: new Date('2023-08-03T00:00:00.000Z'),
      description: 'sadas',
      id: '0.3181836658343091',
    },
    {
      title: 'asdsa',
      date: new Date('2023-08-03T00:00:00.000Z'),
      description: 'asdasds',
      id: '0.9103136998514578',
    },
    {
      title: 'asd',
      date: new Date('2023-08-07T00:00:00.000Z'),
      description: 'asd',
      id: '0.4994391008515875',
    },
    {
      title: 'sad',
      date: new Date('2023-08-11T00:00:00.000Z'),
      description: 'asdsa',
      id: '0.9723998608847293',
    },
  ]);

  // This is not working
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
      let updateTasks = prevTasks.filter((task) => task.id !== taskId);
      return updateTasks;
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
