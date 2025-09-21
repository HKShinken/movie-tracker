import Paginate from '../components/Paginate';
import { Table, Spinner } from 'react-bootstrap';
import ModalPoster from '../components/ModalPoster.jsx'
import { useGetWatchListPagedQuery } from '../slices/userApiSlice.js'
import { useParams } from 'react-router-dom'

const UserWatchlist = () => {

  let { page } = useParams();
  page = page ? page : 1

  const { data:result, isLoading: wlistLoading, /*refetch: refetchWlist , error: errWlist*/ } = useGetWatchListPagedQuery(page)

  return (
    <>
      { wlistLoading ? <Spinner /> : <>
        
          <Paginate pages={ [...Array(Math.ceil(result.wlistLength/result.pageItems)).keys()] } 
              current_page={page}
              path={`/user/watchlist`} /> 

            <Table striped bordered hover variant="light" >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Watched</th>
                    <th>Rank</th>
                    <th>Poster</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { wlistLoading ? <Spinner/> : result.wlist && result.wlist.length === 0 ? <h1>No films in your watchlist</h1> : 

                      result.wlist.map( (f, idx) => (
                            <tr key={f.imdbId}>
                                <td>{idx + 1}</td>
                                <td>{f.title}</td>
                                <td>{f.year}</td>
                                <td>{f.watched ? "Yes" : "No"}</td>
                                <td>{f.rank ? f.rank : "Not ranked"}</td>
                                <td><ModalPoster
                                    title={f.title} 
                                    poster={f.poster} /></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </Table>
                      <Paginate pages={ [...Array(Math.ceil(result.wlistLength/result.pageItems)).keys()] } 
              current_page={page}
              path={`/user/watchlist`} /> 
          </>
      }
    </>
  );
}

export default UserWatchlist;
