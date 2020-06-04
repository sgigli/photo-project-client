import React, { useState, useRef, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import { Button } from 'react-bootstrap-buttons'
// import { render } from 'react-dom'
// function ImageModal (props)

const ImageModal = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [unstyledComments, setUnstyledComments] = useState(props.image.comments)
  const input = useRef(null)
  const [focus, setFocus] = useState(false)

  const handleClose = () => {
    setFocus(false)
    setShow(false)
  }

  React.useImperativeHandle(ref, () => ({
    callHandleShow () {
      handleShowFocus(undefined, 'focus')
    }
  }))

  const handleShowFocus = () => {
    setShow(true)
    setFocus(true)
  }

  const handleShow = (filler, fcs) => {
    setShow(true)
    setFocus(false)
  }

  const handleMessage = (e) => {
    if (e.target.value) {

    }
    setMessage(e.target.value)
  }

  const sendComment = (e) => {
    console.log(input)
    e.preventDefault()
    const comments = [...unstyledComments]
    comments.push(message)

    axios({
      url: apiUrl + '/uploads/' + props.image._id,
      method: 'PATCH',
      data: {
        upload: {
          comments: comments
        }
      }
    })
      .then(res => {
        console.log(res)
        getImage()
      })
      .catch(console.error)
  }

  const getImage = () => {
    axios({
      url: apiUrl + '/uploads/' + props.image._id,
      method: 'GET'
    })
      .then(res => {
        setUnstyledComments(res.data.upload.comments)
        document.getElementById('comment_form').reset()
        const element = document.getElementById('history')
        element.scrollTop = element.scrollHeight
      })
      .catch(console.error)
  }

  const styledComments = unstyledComments.map((comment, index) => {
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

  useEffect(() => {
    if (focus) {
      input.current.focus()
    }
  })

  return (
    <div>
      <Image className='icon_inner' src={props.image.fileUrl} onClick={handleShow} thumbnail />

      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Row className="show-grid">
            <Col className="modal-img-cont" xs={8}>
              <div className="cont">
                <div className="vert">
                  <Image src={props.image.fileUrl} className="modal-image"/>
                </div>
              </div>
            </Col>
            <Col className="modal-com-cont">
              <div className="comments">
                Comments
              </div>
              <div className="mesgs">
                <div id="history" className="msg_history">
                  <div>
                    {styledComments}
                  </div>
                </div>
                <div className="type_msg">
                  <form id='comment_form' className="input_msg_write" onSubmit={sendComment}>
                    <input ref={input} type="text" className="write_msg" placeholder="Type a message" onChange={handleMessage} required />
                    <button onClick={sendComment} className={message ? 'msg_send_btn' : 'msg_send_btn andDisabled'} type="button" ><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
})

ImageModal.displayName = 'ImageModal'

export default ImageModal
