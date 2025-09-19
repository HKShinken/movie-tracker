import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useModifyUserMutation } from '../../slices/adminApiSlice.js'
import FormContainer from '../../components/FormContainer'
import { useEffect, useState } from 'react';
import {toast} from 'react-toastify'

function ModalUserMod({user, refetchUsrList}) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [admin, setAdmin] = useState(user.isAdmin);


  const handleClose = () => {
                              setShow(false);
                              //setAdmin(user.isAdmin);
                            }

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit");

    //processed update
    try {
        const res = await modifyUser({_id:user._id, name, surname, email, isAdmin:admin})
        console.log("Update result: ", res)
        toast.success("User modified successfully!")
        //updates backgournd list
        refetchUsrList()

        handleClose()
    }
    catch(err) {
        toast.error(err?.data?.message || err.error)
    }

  }

  const handleAdmin = async(e) => {
    //console.log("previous admin setting: ", admin)
    //se attualmente non è un admin e l' amministratore conferma di volerlo rendere admin
    if( !admin && window.confirm("Do you really want to make user " + user.email + " an Admin?"))
    {
      e.target.checked = true;
      setAdmin(true)
    }
    else {
        
        e.target.checked = false;
        setAdmin(false)
      }
  }

  const [modifyUser, {isLoading , error}]= useModifyUserMutation();

  useEffect( () => {
     console.log("current admin setting: ", admin)
  },[admin])

  return (<>
            {isLoading ? <Spinner/> : <>
                <Button variant="primary" onClick={handleShow}>
                  Modify User
                </Button>

                <Modal show={show} 
                      onHide={handleClose}>

                  <Modal.Header 
                      className="bg-primary-subtle" 
                    closeButton>
                    <Modal.Title className="mx-auto">Modifying User: <strong>{user.email}</strong></Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                    
                    <FormContainer>
                        <Form id="modForm" onSubmit={handleSubmit}>

                          <Form.Group className="mb-3" controlId="emailForm">
                            <Form.Label>Modify Email</Form.Label>
                            <Form.Control type="email"
                                          required
                                          placeholder="Insert a valid email"
                                          value = {email}
                                          onClick={(e) => {setEmail(e.target.value)} }
                              />
                            </Form.Group>

                          <Form.Group className="mb-3" controlId="nameForm">
                            <Form.Label>Modify Name </Form.Label>
                            <Form.Control type="text"
                                          required
                                          placeholder="Modify name"
                                          value = {name}
                                          onChange={(e) => {setName(e.target.value)} }
                              />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="surnameForm">
                            <Form.Label>Modify Surname </Form.Label>
                            <Form.Control type="text"
                                          required
                                          placeholder="Modify surname"
                                          value = {surname}
                                          onChange={(e) => {setSurname(e.target.value)} }
                              />
                          </Form.Group>

                          <Form.Check // prettier-ignore
                            type="switch"
                            id="custom-switch"
                            label="Set as Admin"
                            checked={admin}
                            onClick={(e) => handleAdmin(e)}
                          />

                        </Form>
                        
                      </FormContainer>
                  </Modal.Body>

                  <Modal.Footer  className="bg-primary-subtle">
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button type="submit" variant="primary" form="modForm">
                        Save Changes
                      </Button>
                  </Modal.Footer>
                </Modal>
              </>
          }
    </>
  );
}

export default ModalUserMod;