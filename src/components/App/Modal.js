import React, { useState, useRef, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import { FiTrash2 } from 'react-icons/fi'
import { FaRegCommentAlt } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import dateFormat from 'dateformat'

const socket = socketIOClient(apiUrl)

const ImageModal = (props) => {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [focus, setFocus] = useState(false)
  const [unstyledComments, setUnstyledComments] = useState([])
  const input = useRef(null)
  const history = useRef(null)
  const commentForm = useRef(null)

  const handleClose = () => {
    if (focus) { setFocus(false) }
    setShow(false)
    props.handleGetImages()
  }

  const handleShowFocus = () => {
    setUnstyledComments(props.image.comments)
    setShow(true)
    setFocus(true)
  }

  const handleShow = (filler, fcs) => {
    setUnstyledComments(props.image.comments)
    setShow(true)
  }

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  const sendComment = (e) => {
    e.preventDefault()
    const comments = [...unstyledComments]
    comments.push(message)

    axios({
      url: apiUrl + '/uploads/' + props.image._id,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      },
      data: {
        upload: {
          comment: message,
          owner: props.user._id
        }
      }
    })
      .then(res => {
        socket.emit('send-message', props.image._id)
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
        setMessage('')
        commentForm.current.reset()
        const element = history.current
        element.scrollTop = element.scrollHeight
      })
      .catch(console.error)
  }

  const styledComments = unstyledComments.map((comment, index) => {
    const time = dateFormat(comment.date, 'h:MM TT')
    const day = dateFormat(comment.date, 'mmmm d')

    return <div key={index} className="incoming_msg">
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{comment.text}</p>
          <span className="time_date"> {comment.owner.username} | {time} | {day}</span>
        </div>
      </div>
    </div>
  })

  const idIndex = props.image.likes.indexOf(props.user._id)

  useEffect(() => {
    if (focus) {
      input.current.focus()
    }
  })

  useEffect(() => {
    socket.on('refresh-comments', (id) => {
      if (props.image._id.toString() === id) {
        getImage()
      }
    })
  }, [])

  return (
    <div className="grid_cell">
      <div className='img_container' >
        <Image className='icon_inner' src={props.image.fileUrl} onClick={handleShow} thumbnail />
      </div>
      <div className='img_bar'>
        <AiFillLike className={idIndex !== -1 ? 'AiFillLike-LikedByUser' : 'AiFillLike' } onClick={() => props.handleLike(props.image._id, idIndex) }/>
        <p className='bar_info'>{props.image.likes.length}</p>
        <FaRegCommentAlt className='FaRegCommentAlt' onClick={handleShowFocus}/>
        <p className='bar_info'>{props.image.comments.length}</p>
        {props.image.owner._id === props.user._id ? <FiTrash2 onClick={() => props.handleDelete(props.image._id)} className="FiTrash2"/> : ''}
        <div style={{ clear: 'both' }}></div>
        <p className='username'>posted by {props.image.owner.username}</p>
      </div>

      <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Row className="show-grid modal-main-row">
            <Col className="modal-img-cont" xs={8}>
              <div className="horizontal-center">
                <Image src={props.image.fileUrl} className="modal-image"/>
              </div>
            </Col>
            <Col className="modal-com-cont">
              <div className="comments">
                Comments
              </div>
              <div className="mesgs">
                <div ref={history} id="history" className="msg_history">
                  {styledComments}
                </div>
                <div className="type_msg">
                  <form ref={commentForm} id='comment_form' className="input_msg_write" onSubmit={sendComment}>
                    <input ref={input} type="text" className="write_msg" placeholder="Type a message" onChange={handleMessage} required />
                    <button onClick={sendComment} className={message ? 'msg_send_btn' : 'msg_send_btn andDisabled'} type="button" ><i className='fa fa-paper-plane-o' aria-hidden="true"></i></button>
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
}

export default ImageModal
