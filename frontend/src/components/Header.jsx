import Container from 'react-bootstrap/Container';
import { logout } from '../slices/authSlice.js'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import SearchBox from './SearchBox';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


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

           { userInfo && <NavDropdown title={userInfo.isAdmin ? "Admin: " + userInfo.name: userInfo.name} id="basic-nav-dropdown" >
                <NavDropdown.Item><Link to="/search/watchlist">Your Watchlist</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/search/watchlist">Boooh</Link></NavDropdown.Item>
                
                {userInfo.isAdmin ? <NavDropdown.Item><Link to="/admin/userlist">User List</Link></NavDropdown.Item> : <></> }
                
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