import { logout } from '../slices/authSlice.js'
import { useGetFilmsQuery } from '../slices/filmApiSlice.js'
import { useDispatch } from 'react-redux';
import FilmCard from '../components/FilmCard';
import { Button, Col, 
         Spinner, 
         Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const FilmPageScreen = () => {

  let { keyword } = useParams();
  keyword =  keyword ? keyword : "avengers";
  const { data:filmData, isLoading, refetch , error, isError  } = useGetFilmsQuery({keyword})


  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
       console.log("printing film data: ", filmData)
  }

  return (

      <Container fluid>
       
        { isLoading ? <> <h2>loading ... </h2><Spinner /> </> :
          !filmData.Response ? <h2> No Results for "{keyword}" </h2> : <>
            <Row>
                    { filmData.Search.map( (f) =>  (   
                                                      <Col key={f.imdbID} xs={12} md={4}>
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
