import {useState} from 'react';
import { Form, Badge, Row, Col, Button } from 'react-bootstrap';
import FormContainer from './FormContainer'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

  const navigate = useNavigate();

  const [ searchKey, setSearchKey] = useState('');
  //see later
  //const { userInfo } = useSelector( (state) => state.auth )

  const handleSubmit = async(e) =>  {
    e.preventDefault();
    navigate("/search/" + searchKey)

  }

  return (

      <Form onSubmit={(e) => handleSubmit(e)} 
          className="d-flex gap-2"
          style={{marginBottom: "20px"}}
          > 
          
          <Form.Group  controlId="searchForm" 
                       style={{maxWidth:"50%"}}>
                <Form.Label></Form.Label>
                <Form.Control type="text"
                              //required
                              
                              placeholder="Search.."
                              value = {searchKey}
                              onChange={(e) => setSearchKey(e.target.value)}
                  />
              </Form.Group>

              <Button type="submit" variant="primary" size="sm" style={{marginTop: "20px"}} > Go </Button>

      </Form>
  );
}

export default SearchBox;
