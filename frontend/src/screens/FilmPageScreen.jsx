import { Button } from 'react-bootstrap'
import { logout } from '../slices/authSlice.js'
import { useDispatch } from 'react-redux';

const FilmPageScreen = () => {

  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
  }

  return (
    <>

      <h1>
        Login successfully!!!
      </h1>

      <Button onClick={logoutHandler}> LOGOUT </Button>

    </>
  );
}

export default FilmPageScreen;
