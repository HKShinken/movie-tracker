import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { useLoginMutation } from '../slices/userApiSlice.js'

import { setUsrCredentials } from '../slices/authSlice.js';



const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const navigate = useNavigate();

  //getting action and state from slice 
  const countInc = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


    const [ login, // This is the mutation trigger
            { isLoading: isUpdating, error , reset }, // This is the destructured mutation result
          ] = useLoginMutation()

  const handleSubmit = async (e) => {

      const form = e.currentTarget;
      e.preventDefault();
      
      try {

             // senza unwrap devo analizzare l'oggetto data oppure l'error
             // con unwrap recupero direttamente il valore di ritorno del controler
            const res = await login( { email, password:pwd } ).unwrap(); // gets the value from the promise ->json value from the authUser controller
            //sets the lgin credenntials to current session
            dispatch(setUsrCredentials(res))
            if(!isUpdating)
              navigate("/filmpage")

      } catch (err) {
        console.log(err?.data?.message || err.error);
        //toast.error(err?.data?.message || err.error)
      }
}

  return (

    <FormContainer>
      <Form onSubmit={handleSubmit}>

         <Form.Group className="mb-3" controlId="emailForm">
          <Form.Label>Insert your email</Form.Label>
          <Form.Control type="email"
                        required
                        placeholder="Insert a valid email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
            />
         </Form.Group>

         <Form.Group className="mb-3" controlId="pwdForm">
          <Form.Label>Insert password</Form.Label>
          <Form.Control type="password"
                        required
                        placeholder="Digit your password"
                        value = {pwd}
                        onChange={(e) => setPwd(e.target.value)}
            />

            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text>
         </Form.Group>

      { /*countInc*/ }

      
      <Button type="submit">Submit</Button>

      </Form>
    </FormContainer>

  );
}

export default LoginScreen;
