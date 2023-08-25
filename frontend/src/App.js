import { useCallback, useEffect, useState } from 'react';
import ListResults from './components/ListResults';
import UserInput from './components/UserInput';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const myList = [];

      for (const key in data) {
        myList.push({
          id: data[key].id,
          title: data[key].title,
          description: data[key].description,
          date: data[key].date,
          status: data[key].status,
        });
      }

      setTasks(myList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedTasks = [...tasks].sort(
    (taskA, taskB) => new Date(taskA.date) - new Date(taskB.date)
  );

  //Submission
  const onSubmitHandler = async (task) => {
    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const data = await response.json();
      console.log(data);

      fetchData();
    } catch (error) {
      setError(error.message);
    }
    console.log(tasks);
  };

  //Deletion
  const onDeleteItemHandler = async (taskId) => {
    console.log(taskId);
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task.');
      }

      console.log('Item deleted:', taskId);
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  //Update Status
  const onUpdateItemHandler = async(taskStatus, taskId) => {
    try {
      const response = await fetch('/api/delete', {
        method: "UPDATE",
         headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({id: taskId, status: taskStatus})
      })
    }
  }

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} />
      {!loading && (
        <ListResults
          tasks={sortedTasks}
          onDeleteItem={onDeleteItemHandler}
          onUpdateItem={onUpdateItemHandler}
        />
      )}
      {!loading && error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
    </div>
  );
};

export default App;
