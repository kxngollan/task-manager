import React, { useCallback, useEffect, useState } from 'react';
import ListResults from './components/ListResults';
import UserInput from './components/UserInput';
import './App.css';

const dummyArray = [
  {
    date: '2023-08-01',
    description: 'Watch love and basketball',
    id: '0.5058451199981107',
    listStatus: 'Pending',
    title: 'Go cinema',
  },
  {
    date: '2023-08-04',
    description: 'Practice handles',
    id: '0.7775269168910239',
    listStatus: 'Pending',
    title: 'Go to practice',
  },
  {
    date: '2023-08-10',
    description: 'Implement Databases to app',
    id: '0.0005164424028314407',
    other: 'Pending',
    title: 'Learn react',
  },
];

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch all Task from Express
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const myList = Object.keys(data).map((key) => ({
        id: data[key].id,
        title: data[key].title,
        description: data[key].description,
        date: data[key].date,
        listStatus: data[key].status,
      }));

      const sortedTasks = [...myList].sort(
        (taskA, taskB) => new Date(taskA.date) - new Date(taskB.date)
      );

      setTasks(sortedTasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Add a new item
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add task.');
      }

      await response.json();
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete an item
  const onDeleteItemHandler = async (taskId) => {
    console.log(tasks);
  };

  // Update item status
  const onUpdateItemHandler = async (taskStatus, taskId) => {
    try {
      const response = await fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId, status: taskStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task.');
      }

      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} />

      {!loading && (
        <ListResults
          tasks={dummyArray}
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
