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
      data: {
        upload: {
          comments: comments
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
        console.log(res.data.upload)
        setUnstyledComments(res.data.upload.comments)
        setMessage('')
        commentForm.current.reset()
        const element = history.current
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
        <AiFillLike className={idIndex !== -1 ? 'AiFillLike-LikedByUser' : 'AiFillLike' } onClick={() => props.handleLike(props.image, idIndex) }/>
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

// const image = props.images.map((img, index) => {
//   // find index of user id in likes array
//   const idIndex = img.likes.indexOf(this.props.user._id)
//
//   return (
//     <div className="grid_cell" key={index}>
//       <div className='img_container' >
//         <Image className='icon_inner' src={props.images[index].fileUrl} onClick={handleShow} thumbnail />
//       </div>
//       <div className='img_bar'>
//         <AiFillLike id={img._id} data-index={index} onClick={() => this.handleLike(img._id, idIndex, img.likes)}
//           className={idIndex !== -1 ? 'AiFillLike-LikedByUser' : 'AiFillLike' }/>
//         <p className='bar_info'>{img.likes.length}</p>
//         <FaRegCommentAlt className='FaRegCommentAlt' onClick={() => this.refArray[index].callHandleShow()}/>
//         <p className='bar_info'>{img.comments.length}</p>
//         {img.owner._id === this.props.user._id ? <FiTrash2 onClick={() => this.handleDelete(img._id, index)} id={img._id} data-index={index} className="FiTrash2"/> : ''}
//         <div style={{ clear: 'both' }}></div>
//         <p className='username'>posted by {img.owner.username}</p>
//       </div>
//
//       <Modal dialogClassName='modal-90w' show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//         </Modal.Header>
//         <Modal.Body>
//           <Row className="show-grid modal-main-row">
//             <Col className="modal-img-cont" xs={8}>
//               <div className="horizontal-center">
//                 <Image src={props.images[index].fileUrl} className="modal-image"/>
//               </div>
//             </Col>
//             <Col className="modal-com-cont">
//               <div className="comments">
//                 Comments
//               </div>
//               <div className="mesgs">
//                 <div ref={history} id="history" className="msg_history">
//                   {styledComments}
//                 </div>
//                 <div className="type_msg">
//                   <form ref={commentForm} id='comment_form' className="input_msg_write" onSubmit={sendComment}>
//                     <input ref={input} type="text" className="write_msg" placeholder="Type a message" onChange={handleMessage} required />
//                     <button onClick={sendComment} className={message ? 'msg_send_btn' : 'msg_send_btn andDisabled'} type="button" ><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
//                   </form>
//                 </div>
//               </div>
//             </Col>
//           </Row>
//         </Modal.Body>
//         <Modal.Footer>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// })
