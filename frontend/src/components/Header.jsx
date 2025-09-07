import Container from 'react-bootstrap/Container';
import { logout } from '../slices/authSlice.js'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SearchBox from './SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Header() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userInfo = useSelector( (state) => state.auth.userInfo );

  const logoutHandler = async() => {
         dispatch(logout())
         navigate("/")
         toast.success("Logged out")
    }

   
  return (
    <Navbar expand="lg" 
            className="bg-primary-subtle border-bottom border-primary" variant="light">
              
      <Container fluid>
        <Navbar.Brand href="/">Simple movie tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <SearchBox />

          <Nav className="ms-auto d-flex " style={{marginRight: "25%"}}>
          
              <Nav.Link href="/"><strong>Home</strong></Nav.Link>

           { userInfo && <NavDropdown title={userInfo.name} id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
            </NavDropdown> }

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Header;