import { Table } from 'react-bootstrap';
import { useGetUserListQuery } from '../../slices/adminApiSlice.js'
import { Spinner } from 'react-bootstrap';
import { use, useEffect } from 'react';

const UserListScreen = () => {

  const { data:usrList, isLoading: usrListLoading, refetch: refetchUsrList } = useGetUserListQuery()

  return (
    <>
        <Table striped bordered hover variant="light" >
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Username/Email</th>
                <th>Admin</th>
                <th>Film Reviewed</th>
                <th>Registered on</th>
                <th>Delete user</th>
                <th>Modify user</th>
                </tr>
            </thead>
            <tbody>
                
                { usrListLoading ? <Spinner/> : usrList && usrList.length === 0 ? <h1>No Users registered</h1> : 

                   usrList.map( (f, idx) => (
                        <tr key={f.imdbId}>
                            <td>{idx + 1}</td>
                            <td>{f.name}</td>
                            <td>{f.surname}</td>
                            <td>{f.email}</td>
                            <td>{f.isAdmin ? "Yes" : "No"}</td>
                            <td>{f.numReviews}</td>
                            <td>{f.createdAt.substr(0, 19).replace("T", " ")}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    ))
                }
                
            </tbody>
      </Table>
    </>
  );
}

export default UserListScreen;
