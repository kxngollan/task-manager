import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDoList from './pages/ToDoList';
import Login from './pages/Login';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ToDoList />} path="/todolist" />
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </Router>
  );
};

export default App;
