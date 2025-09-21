import { Table, Spinner } from 'react-bootstrap';
import { useGetUserListQueryPaged } from '../../slices/adminApiSlice.js'
import { useParams } from 'react-router-dom';
import ModalUserMod from './ModalUserMod'
import Paginate from '../../components/Paginate.jsx'
import { useState, useEffect } from 'react';

const UserListScreen = () => {

  let { page } = useParams();

  page = page ? page : 1

  const { data:usrList, isLoading: usrListLoading, refetch: refetchUsrList } = useGetUserListQueryPaged({page})

  ///admin/userlist/:page

  return (
    <>
    { usrListLoading ? <Spinner /> : <>
    
      <Paginate pages={ [...Array(Math.ceil(usrList.totalNumber/usrList.pageItems)).keys()] } 
          current_page={page}
          path={`/admin/userlist`} /> 

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

                   usrList.users.map( (u, idx) => (
                        <tr key={u.imdbId}>
                            <td>{idx + 1}</td>
                            <td>{u.name}</td>
                            <td>{u.surname}</td>
                            <td>{u.email}</td>
                            <td>{u.isAdmin ? "Yes" : "No"}</td>
                            <td>{u.numReviews}</td>
                            <td>{u.createdAt.substr(0, 19).replace("T", " ")}</td>
                            <td></td>
                            <td><ModalUserMod user={u}
                                              refetchUsrList={refetchUsrList} /></td>
                        </tr>
                    ))
                }
                
            </tbody>
      </Table>
      <Paginate pages={ [...Array(Math.ceil(usrList.totalNumber/usrList.pageItems)).keys()] } 
          current_page={page}
          path={`/admin/userlist`} /> 
      </>
     }
     </>
  );
}

export default UserListScreen;
