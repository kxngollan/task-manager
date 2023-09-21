import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ToDoList from './pages/ToDoList';
import HomePage from './pages/HomePage';

const routers = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/ToDoList', element: <ToDoList /> },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
