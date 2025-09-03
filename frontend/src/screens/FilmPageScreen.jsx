import { logout } from '../slices/authSlice.js'
import { useGetFilmsQuery } from '../slices/filmApiSlice.js'
import { useDispatch } from 'react-redux';
import FilmCard from '../components/FilmCard';
import { Button, Col, 
         Spinner, 
         Container, Row } from 'react-bootstrap';

const FilmPageScreen = () => {

  const { data:filmData, isLoading, refetch , error, isError  } = useGetFilmsQuery()

  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
       console.log("printing film data: ", filmData)
  }

  return (

      <Container fluid>
        { isLoading || !filmData?.Search ? <> <h2>loading ... </h2><Spinner /> </> :
          <>
            <Row>
                    { filmData.Search.map( (f) =>  (   
                                                      <Col xs={12} md={4}>
                                                          <FilmCard  fcard = {f} />
                                                      </Col>
                                                  ) )}     
            </Row>

          <Button onClick={logoutHandler}> LOGOUT </Button>
          </>
        }
      </Container>

  );
}

export default FilmPageScreen;
