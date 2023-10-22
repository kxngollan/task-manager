import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToDoList from './pages/ToDoList';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<ToDoList />} path="/todolist" />
        </Route>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </Router>
  );
};

export default App;
