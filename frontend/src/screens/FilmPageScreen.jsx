import { logout } from '../slices/authSlice.js'
import { useGetFilmsQuery } from '../slices/filmApiSlice.js'
import { useGetWatchListQuery } from '../slices/userApiSlice.js'
import { useDispatch } from 'react-redux';
import FilmCard from '../components/FilmCard';
import Paginate from '../components/Paginate';
import { Button, Col, 
         Spinner, 
         Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const FilmPageScreen = () => {

  let { keyword, page } = useParams();
  keyword =  keyword ? keyword : "avengers";
  page =  page ? page : "1";

  const { data:filmData, isLoading  } = useGetFilmsQuery({keyword, page})
  const { data:userWatchList, isLoading: wlistLoading  } = useGetWatchListQuery({keyword})

  const dispatch = useDispatch()

  const logoutHandler = async() => {
       dispatch(logout())
       console.log("printing film data: ", userWatchList)
  }

  //const userInfo = useSelector( (state) => state.auth.userInfo )
  //console.log("userInfo from store: ", userInfo)
  //useEffect( () => { console.log("userWatchList from store: ", userWatchList) } )

  return (

      <Container fluid> 
       
        { isLoading || wlistLoading ? <> <h2>loading ... </h2><Spinner /> </> :
          !filmData || filmData.Response === "False" ? <h2> No Results for "{keyword}" </h2> : <>
            <Row>
                <>
                    <Paginate pages={ [0,1,2,3] } 
                        current_page={1}
                        keyword={keyword} />   

                    { [...filmData.Search].sort((a,b) => { return parseInt(b.Year.substring(0,4)) - parseInt(a.Year.substring(0,4)) } ) //sorted by year asc
                    .map( (f) =>  (   
                                                      <Col key={f.imdbID} xs={12} md={4}>
                                                          <FilmCard  
                                                              fcard = {f}
                                                              inList={ (userWatchList.wlist.map(u => u.imdbId)).includes(f.imdbID) }
                                                              review={ (userWatchList.reviews.find(r => r.imdbId === f.imdbID)) }
                                                           />
                                                      </Col>
                                                  ) )}    

                     <Paginate pages={ [0,1,2,3] } 
                          current_page={1}
                          keyword={keyword} />   
                    </>
            </Row>

          <Button onClick={logoutHandler}> LOGOUT </Button>
          </>
        }
      </Container>

  );
}

export default FilmPageScreen;
