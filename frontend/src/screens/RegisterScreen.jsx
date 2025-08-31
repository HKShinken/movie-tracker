import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useLoginMutation } from '../slices/userApiSlice.js'

import { incrementByAmount } from '../slices/testSlice.js';



const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  //getting action and state from slice 
  const countInc = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()


    const [ login, // This is the mutation trigger
    { isLoading: isUpdating, error , reset }, // This is the destructured mutation result
  ] = useLoginMutation()


  const handleSubmit = async (e) => {

      const form = e.currentTarget;
      e.preventDefault();
      //e.stopPropagation();

      //console.log("Printing form object: ", form )
      dispatch(incrementByAmount(2))
      
      try {
             // enza unwrap devo analizzare l'oggetto data oppure l'error
             // con unwrap recupero direttamente il valore di ritorno del controler
            const res = await login( { email, password:pwd } ).unwrap(); // gets the value from the promise ->json value from the authUser controller
            console.log("stampo res mutation: ", res)
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
         </Form.Group>

      { countInc }
      <Form.Text id="passwordHelpBlock" muted>
         Your password must be 8-20 characters long, contain letters and numbers,
         and must not contain spaces, special characters, or emoji.
      </Form.Text>
      
      <Button type="submit">Submit</Button>

      </Form>
    </FormContainer>

  );
}

export default LoginScreen;
