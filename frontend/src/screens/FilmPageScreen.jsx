import { logout } from '../slices/authSlice.js'
import { useGetFilmsQuery } from '../slices/filmApiSlice.js'
import { useDispatch } from 'react-redux';
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap';

const FilmPageScreen = () => {

  const { data:filmData, isLoading, refetch , error, isError  } = useGetFilmsQuery()

  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
       console.log("printing film data: ", filmData)
  }

  return (
    <>

      <h1>
        Login successfully!!!
      </h1>
      {isError && <p>Error: {error?.data?.message || error.error}</p>}
      { isLoading || !filmData?.Search ? <Spinner /> :
       filmData.Search.map( (f) =>  (

                                            <Card key={f.imdbID} style={{ width: '18rem' }}>
                                              <Card.Img variant="top" src={f.Poster} />
                                              <Card.Body>
                                                <Card.Title>{f.Title}</Card.Title>
                                                <Card.Text></Card.Text>
                                                <ListGroup variant="flush">
                                                  <ListGroup.Item>Year: {f.Year}</ListGroup.Item>
                                                  <ListGroup.Item>Type: {f.Type}</ListGroup.Item>
                                                </ListGroup>
                                                
                                              </Card.Body>
                                            </Card>
                                        )
      )}

      <Button onClick={logoutHandler}> LOGOUT </Button>

    </>
  );
}

export default FilmPageScreen;
