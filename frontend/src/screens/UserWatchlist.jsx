import React from 'react';
import { Table, Spinner } from 'react-bootstrap';

import { useGetWatchListQuery } from '../slices/userApiSlice.js'

const UserWatchlist = () => {

  const { data:uwlist, isLoading: wlistLoading, refetch: refetchWlist , error: errWlist  } = useGetWatchListQuery()

  return (
    <>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Watched</th>
                <th>Rank</th>
                </tr>
            </thead>
            <tbody>
                
                { wlistLoading ? <Spinner/> : uwlist.length === 0 ? <h1>No films in your watchlist</h1> : 

                   uwlist.map( (f, idx) => (
                        <tr key={f.imdbId}>
                            <td>{idx + 1}</td>
                            <td>{f.title}</td>
                            <td>{f.year}</td>
                            <td>{f.watched ? "Yes" : "No"}</td>
                            <td>{f.rank ? f.rank : "Not ranked"}</td>
                        </tr>
                    ))
                }
                
            </tbody>
            </Table>
    </>
  );
}

export default UserWatchlist;
