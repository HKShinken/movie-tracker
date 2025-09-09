import { useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useEffect } from 'react';


const HomePageScreen = () => {

  
  const userInfo = useSelector( (state) => state.auth.userInfo )
  const navigate = useNavigate();
  
  useEffect( () => { if(userInfo) { navigate('/filmpage') } } )

  return (

    <>

      <h1>
        Welcome to Movie tracker!!
      </h1>

     <Row> <Link to="/register" className="mt-4"> Click here to Register </Link> </Row>
     <Row > <Link to="/login" className="mt-4"> Alredy registered? Click here to Login! </Link> </Row>

    </>
  );
}

export default HomePageScreen;
