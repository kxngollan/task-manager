import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <p>
        <Link to="/login">sign in</Link>
      </p>
    </div>
  );
};

export default HomePage;
