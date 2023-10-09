import { useState } from 'react';
import ListResults from '../components/ToDoItems/ListResults';
import UserInput from '../components/UserInput/UserInput';
import './ToDoList.css';
import { Link } from 'react-router-dom';

const DemoList = () => {
  const [tasks, setTasks] = useState([]);
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
  const onUpdateItemHandler = (status, id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            listStatus: task.listStatus === 'Pending' ? 'Complete' : 'Pending',
          };
        }
        return task;
      });
    });
  };

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} />
      <div className="logout">
        <Link to="/">
          <button>Login</button>
        </Link>
      </div>
      <div className="container">
        <ListResults
          tasks={sortedTasks}
          onDeleteItem={onDeleteItemHandler}
          onUpdateItem={onUpdateItemHandler}
        />
      </div>
    </div>
  );
};

export default DemoList;
