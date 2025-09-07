import { Form, Button, Row } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import { useLoginMutation, useRegisterMutation } from '../slices/userApiSlice.js'
import { useNavigate, Link } from 'react-router-dom';


const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const navigate = useNavigate();

    const [ login, // This is the mutation trigger
    { isLoading: isUpdating, error , reset }, // This is the destructured mutation result
  ] = useLoginMutation()

      const [ register, // This is the mutation trigger
    { isLoading: isRegister, errorReg , resetReg }, // This is the destructured mutation result
  ] = useRegisterMutation()


  const handleSubmit = async (e) => {

      e.preventDefault();

      if(pwd !== confirmPwd)
      {
          toast.error("Password and confirm password do not match")
          return
      }
      
      try {
            const reg = await register( { name, surname, email, password:pwd } ).unwrap();

             // senza unwrap devo analizzare l'oggetto data oppure l'error
             // con unwrap recupero direttamente il valore di ritorno del controler
            const log = await login( { email, password:pwd } ).unwrap(); // gets the value from the promise ->json value from the authUser controller

            navigate("/filmpage")
            toast.success("Registration successful")
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

         <Form.Group className="mb-3" controlId="confirmPwdForm">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password"
                          required
                          placeholder="Confirm password"
                          value = {confirmPwd}
                          onChange={(e) => setConfirmPwd(e.target.value)}
              />
         </Form.Group>

         <Form.Group className="mb-3" controlId="nameForm">
            <Form.Label>Insert your name</Form.Label>
            <Form.Control required
                          placeholder="Digit your name"
                          value = {name}
                          onChange={(e) => setName(e.target.value)}
              />
         </Form.Group>

         <Form.Group className="mb-3" controlId="surnameForm">
            <Form.Label>Insert your surname</Form.Label>
            <Form.Control required
                          placeholder="Digit your surname"
                          value = {surname}
                          onChange={(e) => setSurname(e.target.value)}
              />
         </Form.Group>

      <Form.Text id="passwordHelpBlock" muted>
         Your password must be 8-20 characters long, contain letters and numbers,
         and must not contain spaces, special characters, or emoji.
      </Form.Text>
      
      <Button type="submit">Submit</Button>

      </Form>

     <Row > <Link to="/login" className="mt-4"> Alredy registered? Click here to Login! </Link> </Row>
    </FormContainer>

  );
}

export default LoginScreen;
