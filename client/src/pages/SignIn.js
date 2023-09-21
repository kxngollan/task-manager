import Login from '../components/userSignIn/Login';
import Register from '../components/userSignIn/Register';

const SignIn = () => {
  const [currentform, setCurrentForm] = useState('login');

  return <>{currentform === 'login' ? <Login /> : <Register />}</>;
};

export default SignIn;
