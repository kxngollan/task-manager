import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ToDoList from './pages/ToDoList';
import Login from './pages/Login';
import Register from './pages/Register';
import DemoList from './pages/DemoList';

const routers = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  // { path: '/todolist', element: <ToDoList /> },
  { path: '/demolist', element: <DemoList /> },
]);

const App = () => {
  return <RouterProvider router={routers} />;
};

export default App;
