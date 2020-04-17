import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
// import Image from 'react-bootstrap/Image'
// import { Modal, Button } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import ImageModal from './Modal'
// const Modal = require('react-bootstrap-modal')

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      images: []
    }
    this.handleDelete = this.handleDelete.bind(this)
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

  render () {
    const images = this.state.images.map((img, index) => {
      return (
        <li key={index}>
          <div className='img_container' onClick={this.showModal}>
            <ImageModal image={img}/>
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
        <div className={this.state.file ? '' : 'hide_file_field'}>
          <label>Select a file:</label>
          <input type="file" id="myfile" name="myfile" onChange={(e) =>
            this.handleFile(e)} />
          <button onClick={(e) => this.handleUpload(e)}>Upload</button>
          <button onClick={(e) => this.handleGetImages(e)}>Get Images</button>
        </div>
        <ul>{images}</ul>
      </main>
    )
  }
}

export default PhotoUpload
