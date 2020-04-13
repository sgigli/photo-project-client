import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
// import { Button } from 'react-bootstrap-buttons'
// import { render } from 'react-dom'

function Example (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch modal
      </Button>

      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are reading this text in a modal!
          <Image src={props.image} className="modal-image"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Example
