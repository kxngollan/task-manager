import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './pages/TodoList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './pages/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path="/" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<ProtectedRoute />}>
          <Route element={<TodoList />} path="/todolist" />
        </Route>
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </Router>
  );
};

export default App;
