import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
// import { Button } from 'react-bootstrap-buttons'
// import { render } from 'react-dom'

function ImageModal (props) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // const test = () => { console.log('test') }

  // <Button variant="primary" onClick={handleShow}>
  //   Launch modal
  // </Button>

  return (
    <div>
      <Image className='icon' src={props.image} onClick={handleShow} thumbnail />

      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="show-grid">
            <Col className="modal-img-cont" xs={8}>
              <Image src={props.image} className="modal-image"/>
            </Col>
            <Col className="modal-com-cont">
              <div className="comments">
                Comments
              </div>
            </Col>
          </Row>
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

export default ImageModal
