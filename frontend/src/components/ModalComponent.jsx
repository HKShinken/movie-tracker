import { useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function ModalComponent({title, poster}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(!show);

  return (
    <>
      <Button variant="link" onClick={handleClose}>
        See
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header className="bg-primary-subtle">
          <Modal.Title className="mx-auto">{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="mx-auto bg-secondary-subtle p-4">
           <Image src={poster}  />
         </Modal.Body>

        <Modal.Footer className="bg-primary-subtle">
          <Button variant="primary" onClick={handleClose} > Close </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

export default ModalComponent;