import 'bootstrap/dist/css/bootstrap.min.css'; //default bootstrap file
//import './assets/styles/index.css'; //opzionali forniti dal corso
//import './assets/styles/bootstrap.custom.css';
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import  LoginScreen  from "./screens/LoginScreen"
import  RegisterScreen  from "./screens/RegisterScreen"
import  HomePageScreen  from "./screens/HomePageScreen"
import  FilmPageScreen  from "./screens/FilmPageScreen"
import  PrivateRoute  from "./components/PrivateRoute"
import SearchBox from './components/SearchBox';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      {/* Routes */}

      <Routes>

        <Route path="/" element={<App/>} > {/* shows each Screen inside the APP -> OUTLET component */}
        
          <Route index={true} path="/" element={<HomePageScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />


          { /* private routes, require login*/ }
          <Route path="" element={<PrivateRoute />}>
              <Route path="/filmpage" element={<FilmPageScreen />} />
              <Route path="/search/:keyword" element={<FilmPageScreen />} />
          </Route>

        </Route>






         { /* admin routes placeholder, the not mapped above
       <Route path="" element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
          <Route path="/admin/productlist" element={<ProductListScreen />} />
          <Route path="/admin/productlist/:pageNumber" element={<ProductListScreen />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
       </Route> */ }

      </Routes>

    </BrowserRouter>

);

