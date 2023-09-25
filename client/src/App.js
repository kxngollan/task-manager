import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ToDoList from './pages/ToDoList';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

const routers = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/todolist', element: <ToDoList /> },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
