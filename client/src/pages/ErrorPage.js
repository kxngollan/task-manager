import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="container">
      <h1>Page not found</h1>
      <img src={process.env.PUBLIC_URL + '/404.png'} alt="404 Page error"></img>
      <h2>Please go back to Home</h2>
      <Link to="/">
        <button className="homebutton">Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
