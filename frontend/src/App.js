import Header from "./components/Header"
import Footer from "./components/Footer"

import { Container } from "react-bootstrap"
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import { store } from './store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';

//npm i @reduxjs/toolkit react-redux
//react-redux fa da ponte con redux perchè redux può essere usato da solo
// paypal dependency for fe ->  npm i @paypal/react-paypal-js
// npm install multer for file upload
// npm install react-helmet-async --legacy-peer-deps  -> ignore conflicts on react 19
const App = () => {
  return (
    <>
    <Provider store={store}> {/* react app is aware of redux store */}
       {/* <Header /> */ }
          <main className="py-3">
            <Container>
               <Outlet />
            </Container>
          </main>
       {/* <Footer /> */ }
        <ToastContainer /> {/* toast tag  position doesn't matter */}
      </Provider>
    </>
  );
}

export default App;
