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
      const response = await fetch(
        'https://react-list-fcbff-default-rtdb.firebaseio.com/list.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      const myList = [];

      for (const key in data) {
        myList.push({
          id: key,
          title: data[key].title,
          description: data[key].description,
          date: data[key].date,
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

  const onSubmitHandler = async (task) => {
    try {
      const response = await fetch(
        'https://react-list-fcbff-default-rtdb.firebaseio.com/list.json',
        {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add task.');
      }

      const data = await response.json();
      console.log(data);

      setTasks((prevTasks) => [task, ...prevTasks]);
    } catch (error) {
      setError(error.message);
    }
  };

  const onDeleteItemHandler = (taskId) => {
    setTasks((prevTasks) => {
      let updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });
  };

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} />
      {!loading && (
        <ListResults tasks={sortedTasks} onDeleteItem={onDeleteItemHandler} />
      )}
      {!loading && error && <h2>{error}</h2>}
      {loading && <h2>Loading...</h2>}
    </div>
  );
};

export default App;
