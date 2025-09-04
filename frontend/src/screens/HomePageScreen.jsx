import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'


const HomePageScreen = () => {

  const dispatch = useDispatch()

  return (
    <>

      <h1>
        Welcome to Movie tracker!!
      </h1>

      <Link to="/login"> Click here to Login </Link>

    </>
  );
}

export default HomePageScreen;
