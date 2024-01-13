import { Link } from 'react-router-dom';
import './Error.css';

const Error = () => {
  return (
    <div className="container">
      <h1>Page not found</h1>
      <img src={'./Photos/404.png'} alt="404 Page error"></img>
      <h2>Please go back to Home</h2>
      <Link to="/">
        <button className="homebutton">Home</button>
      </Link>
    </div>
  );
};

export default Error;
