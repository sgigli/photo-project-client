import React, { useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import { Button } from 'react-bootstrap-buttons'
// import { render } from 'react-dom'

function ImageModal (props) {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleMessage = (e) => setMessage(e.target.value)

  const sendComment = (e) => {
    e.preventDefault()
    console.log(message)
    axios({
      url: apiUrl + '/uploads/' + props.image._id,
      method: 'PATCH',
      data: {
        upload: {
          comments: [message]
        }
      }
    })
      .then(res => {
        console.log(res)
        // const images = res.data.uploads
        // this.setState({ file: null, images: images })
      })
      .catch(console.error)
  }

  const comments = props.image.comments.map((comment, index) => {
    return <li key={index}>{comment}</li>
  })

  const comments2 = props.image.comments.map((comment, index) => {
    return <div key={index} className="incoming_msg">
      <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{comment}</p>
          <span className="time_date"> 11:01 AM    |    June 9</span>
        </div>
      </div>
    </div>
  })

  return (
    <div>
      <Image className='icon' src={props.image.fileUrl} onClick={handleShow} thumbnail />

      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
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
              </div>
              <div className="mesgs">
                <div className="msg_history">
                  <div className="incoming_msg">
                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>Test which is a new approach to have all
                          solutions</p>
                        <span className="time_date"> 11:01 AM    |    June 9</span>
                      </div>
                    </div>
                  </div>
                  {comments2}
                </div>
                <div className="type_msg">
                  <form className="input_msg_write" onSubmit={sendComment}>
                    <input type="text" className="write_msg" placeholder="Type a message" onChange={handleMessage}/>
                    <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </form>
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
