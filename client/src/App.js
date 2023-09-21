import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ToDoLst from './pages/ToDoList';

const routers = createBrowserRouter([
  { path: '/signin', element: <SignIn /> },
  { path: '/ToDoList', element: <ToDoList /> },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
