import { logout } from '../slices/authSlice.js'
import { useGetFilmsQuery } from '../slices/filmApiSlice.js'
import { useGetWatchListQuery } from '../slices/userApiSlice.js'
import { useDispatch, useSelector } from 'react-redux';
import FilmCard from '../components/FilmCard';
import { Button, Col, 
         Spinner, 
         Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const FilmPageScreen = () => {

  let { keyword } = useParams();
  keyword =  keyword ? keyword : "avengers";

  const { data:filmData, isLoading, refetch , error,  } = useGetFilmsQuery({keyword})
  const { data:userWatchList, isLoading: wlistLoading, refetch: refetchWlist , error: errWlist  } = useGetWatchListQuery({keyword})


  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
       console.log("printing film data: ", filmData)
  }

  //const userInfo = useSelector( (state) => state.auth.userInfo )
  //console.log("userInfo from store: ", userInfo)
  //useEffect( () => { console.log("userWatchList from store: ", userWatchList) } )

  return (

      <Container fluid>
       
        { isLoading ? <> <h2>loading ... </h2><Spinner /> </> :
          !filmData || filmData.Response === "False" ? <h2> No Results for "{keyword}" </h2> : <>
            <Row>
                    { [...filmData.Search].sort((a,b) => { return parseInt(b.Year.substring(0,4)) - parseInt(a.Year.substring(0,4)) } ) //sorted by year asc
                    .map( (f) =>  (   
                                                      <Col key={f.imdbID} xs={12} md={4}>
                                                          <FilmCard  
                                                              fcard = {f}
                                                              watched={userWatchList.includes(f.imdbID)}
                                                           />
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
