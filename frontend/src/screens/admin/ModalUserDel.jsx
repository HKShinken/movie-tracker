import { Button, Modal} from 'react-bootstrap';
import { useState } from 'react';
import { FcDeleteDatabase } from "react-icons/fc";

function ModalUserDel({user}) {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="d-flex mx-auto"
              onClick={handleShow}
              >
        <FcDeleteDatabase size={25}/>
      </Button>

      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>Do you really want to delete user: {user.email}</Modal.Body>
        
        <Modal.Footer>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleClose}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUserDel;