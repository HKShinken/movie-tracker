import { Table } from 'react-bootstrap';
import { useGetUserListQuery } from '../../slices/adminApiSlice.js'
import { Spinner } from 'react-bootstrap';
import { use, useEffect } from 'react';

const UserListScreen = () => {

const { data:usrList, isloading: usrListLoading, refetch: refetchUsrList } = useGetUserListQuery()

useEffect( () => {
   
    console.log("stampo", usrList)
}, [refetchUsrList] )

return (

    <>
           <h1>Users</h1>
           { usrList && console.log("stampo", usrList) }
    </>
  );
}

export default UserListScreen;
