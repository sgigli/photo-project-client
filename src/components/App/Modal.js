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

  const comments = props.image.comments.map((comment, index) => {
    return <li key={index}>{comment}</li>
  })

  return (
    <div>
      <Image className='icon' src={props.image.fileUrl} onClick={handleShow} thumbnail />

      <Modal dialogclassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="show-grid">
            <Col className="modal-img-cont" xs={8}>
              <Image src={props.image.fileUrl} className="modal-image"/>
            </Col>
            <Col className="modal-com-cont">
              <div className="comments">
                Comments
                <ul>
                  {comments}
                </ul>
                <div className="mesgs">
                  <div className="msg_history">
                    <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>Test which is a new approach to have all
                            solutions</p>
                          <span className="time_date"> 11:01 AM    |    June 9</span></div>
                      </div>
                    </div>
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>Test which is a new approach to have all
                          solutions</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span> </div>
                    </div>
                    <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>Test, which is a new approach to have</p>
                          <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
                      </div>
                    </div>
                    <div className="outgoing_msg">
                      <div className="sent_msg">
                        <p>Apollo University, Delhi, India Test</p>
                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                    </div>
                    <div className="incoming_msg">
                      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                      <div className="received_msg">
                        <div className="received_withd_msg">
                          <p>We work directly with our designers and suppliers,
                            and sell direct to you, which means quality, exclusive
                            products, at a price anyone can afford.</p>
                          <span className="time_date"> 11:01 AM    |    Today</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="type_msg">
                    <div className="input_msg_write">
                      <input type="text" className="write_msg" placeholder="Type a message" />
                      <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                    </div>
                  </div>
                </div>
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
