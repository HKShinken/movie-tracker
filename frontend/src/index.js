import 'bootstrap/dist/css/bootstrap.min.css'; //default bootstrap file
import './assets/styles/custom_style.css';
//import './assets/styles/index.css'; //opzionali forniti dal corso
//import './assets/styles/bootstrap.custom.css';
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginScreen  from "./screens/LoginScreen"
import RegisterScreen  from "./screens/RegisterScreen"
import HomePageScreen  from "./screens/HomePageScreen"
import FilmPageScreen  from "./screens/FilmPageScreen"
import PrivateRoute  from "./components/PrivateRoute"
import AdminRoute  from "./components/AdminRoute"
import UserListScreen from './screens/admin/UserListScreen';
import UserWatchlist from './screens/UserWatchlist';
import MakeReview from './components/MakeRating';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
      {/* Routes */}

      <Routes>

        <Route path="/" element={<App/>} > {/* shows each Screen inside the APP -> OUTLET component */}
        
          <Route index={true} path="/" element={<HomePageScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/test" element={<MakeReview originalRating={3}/>} />


          { /* private routes, require login*/ }
          <Route path="" element={<PrivateRoute />}>
              <Route path="/filmpage" element={<FilmPageScreen />} />
              <Route path="/search/:keyword" element={<FilmPageScreen />} />
              <Route path="/search/:keyword/:page" element={<FilmPageScreen />} />
              <Route path="/search/watchlist" element={<UserWatchlist />} />

              <Route path="/admin/userlist" element={<UserListScreen />} />
          </Route>

        </Route>

         
       <Route path="" element={<AdminRoute />}>
          <Route path="adsads/admin/userlist" element={<UserListScreen />} />
       </Route> 

      </Routes>

    </BrowserRouter>

);

