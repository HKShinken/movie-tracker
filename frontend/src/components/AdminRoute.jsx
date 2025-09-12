import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth); //accessing the auth state from the redux store
  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/filmpage" replace />; //replace the login page in the history stack
}

export default AdminRoute;
