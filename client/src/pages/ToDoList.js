import React, { useCallback, useEffect, useState } from 'react';
import ListResults from '../components/ToDoItems/ListResults';
import UserInput from '../components/UserInput/UserInput';
import './ToDoList.css';
import Cookies from 'universal-cookie';

const fetchURL = 'http://localhost:8000';

const cookies = new Cookies();
const token = cookies.get('TOKEN');

const UserData = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Fetch all Task from Express
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${fetchURL}/fetchitems/user`);
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
    console.log(task);
    try {
      const response = await fetch(`${fetchURL}/additems`, {
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
    try {
      const response = await fetch(`${fetchURL}/deleteitems`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task.');
      }
      fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  // Update item status
  const onUpdateItemHandler = async (taskStatus, taskId) => {
    try {
      const response = await fetch(`${fetchURL}/updateitemstatus`, {
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

  const logout = async () => {
    try {
      const response = await fetch(`${fetchURL}/logout`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      window.location.href = '/';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} userEmail={token.email} />
      <div className="container">
        {!loading && (
          <ListResults
            tasks={tasks}
            onDeleteItem={onDeleteItemHandler}
            onUpdateItem={onUpdateItemHandler}
          />
        )}

        {!loading && error && <h2>{error}</h2>}
        {loading && <h2>Loading...</h2>}
      </div>
      <div className="container">
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
