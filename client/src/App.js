import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<TodoList />} path="/todolist" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </Router>
  );
};

export default App;
