import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInput from './UserInput/UserInput';
import ListResults from './List/ListResults';
import fetchURL from '../../util/fetchURL';
import './List.css';

const token = localStorage.getItem('token');

const listURL = `${fetchURL}/list`;

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const redirect = useNavigate();

  //Fetch Task Items
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${listURL}/fetchitems`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        return redirect('/');
      }

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();

      console.log(data);

      const listItems = Object.keys(data).map((key) => ({
        title: data[key].title,
        description: data[key].description,
        date: data[key].date,
        listId: data[key].listId,
        listStatus: data[key].listStatus,
      }));

      setItems(listItems);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again.');
    }
  }, [redirect]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Add a new item
  const onSubmitHandler = async (task) => {
    console.log(task);
    try {
      const res = await fetch(`${listURL}/additem`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(task),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add task.');
      }

      if (res.status === 401) {
        return redirect('/');
      }

      fetchItems();
    } catch (err) {
      console.error('Error adding items', err);
      setError('Failed to add item. Please try again.');
    }
  };

  // Delete an item
  const onDeleteItemHandler = async (listId) => {
    console.log(listId);
    try {
      const res = await fetch(`${fetchURL}/list/deleteitem`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ listId: listId }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete task.');
      }

      if (res.status === 401) {
        return redirect('/');
      }

      fetchItems();
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again.');
    }
  };

  // Update item status
  const onUpdateItemHandler = async (listStatus, listId) => {
    console.log(listStatus, listId);
    try {
      const res = await fetch(`${listURL}/updateitem`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId, listStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update task.');
      }

      if (res.status === 401) {
        return redirect('/');
      }

      fetchItems();
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again.');
    }
  };

  const logout = async () => {
    try {
      const res = await fetch(`${fetchURL}/signin/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      localStorage.removeItem('token');
      return redirect('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <UserInput onAddTask={onSubmitHandler} />
      <div className="container">
        {!loading && (
          <ListResults
            items={items}
            onDeleteItem={onDeleteItemHandler}
            onUpdateItem={onUpdateItemHandler}
          />
        )}
        {loading && <h2>Loading...</h2>}
        {!loading && error && <h2>{error}</h2>}
      </div>
      <div className="container">
        <div className="logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default List;
