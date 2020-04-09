import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap-modal'
import { Button } from 'react-bootstrap-buttons'
// import Example from './Modal'

// function RenderModal () {
//   const [setShow] = React.useState(false)
//
//   const handleClose = () => setShow(false)
//   // const handleShow = () => setShow(true)
//   // <Button variant="primary" onClick={handleShow}>
//   //   Launch demo modal
//   // </Button>
//
//   return (
//     <Modal show={true} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modal heading</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleClose}>
//           Save Changes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   )
// }

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      showModal: false,
      images: []
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleFile (e) {
    console.log(e.target.files[0], '$$$$')
    const file = e.target.files[0]
    this.setState({ file: file })
  }

  handleUpload (e) {
    const file = this.state.file
    const formdata = new FormData()
    formdata.append('file', file)

    axios({
      url: apiUrl + '/uploads',
      method: 'POST',
      data: formdata
    })
      .then(() => {
        this.handleGetImages()
        document.getElementById('myfile').value = null
      })
  }

  handleGetImages (e) {
    axios({
      url: apiUrl + '/uploads',
      method: 'GET'
    })
      .then(res => {
        console.log(res.data.uploads)
        const images = res.data.uploads
        this.setState({ file: null, images: images })
      })
      .catch(console.error)
  }

  handleDelete (e) {
    const id = e.target.id
    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'DELETE'
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  // [show, setShow] = useState(false);
  //
  handleClose () {
    this.setState({ showModal: false })
  }
  handleShow () {
    this.setState({ showModal: true })
  }

  render () {
    console.log('test')
    console.log(this.state.showModal)
    const images = this.state.images.map((img, index) => {
      return (
        <li key={index}>
          <div className='img_container'>
            <Image className='image' src={img.fileUrl} thumbnail />
          </div>
          <div className='img_bar'>
            <button
              className='btn-danger'
              onClick={this.handleDelete}
              id={img._id}
            >
              Delete
            </button>
          </div>
        </li>
      )
    })
    return (
      <main>
        <div className={this.state.file ? '' : 'hide_file_field' }>
          <label>Select a file:</label>
          <input type="file" id="myfile" name="myfile" onChange={(e) =>
            this.handleFile(e)} />
          <button onClick={(e) => this.handleUpload(e)}>Upload</button>
          <button onClick={(e) => this.handleGetImages(e)}>Get Images</button>
        </div>
        <ul>{images}</ul>
        <Button variant="primary" onClick={this.handleShow}>
          Launch demo modal 1
        </Button>

        <Modal show={true} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    )
  }
}

export default PhotoUpload
