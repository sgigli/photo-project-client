import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Grid from 'react-css-grid'
// import Image from 'react-bootstrap/Image'
// import { Modal, Button } from 'react-bootstrap'
// import { Button } from 'react-bootstrap'
import ImageModal from './Modal'
// import $ from 'jquery'
// const Modal = require('react-bootstrap-modal')

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      images: []
    }
    this.fileInput = React.createRef()
  }

  triggerFileHandler = (e) => {
    console.log('test')
    console.log(this.fileInput.current)
    this.fileInput.current.click()
    // this.fileInput.text = 'TESTT'
    // $('#myfile').trigger('click')
  }

  handleFile = (e) => {
    console.log(e.target.files[0], '$$$$')
    const file = e.target.files[0]
    console.log(file.name)
    this.setState({ file: file })
  }

  handleUpload = (e) => {
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
        this.fileInput.current.value = null
        // $('#myfile').value = null
      })
  }

  handleGetImages = (e) => {
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

  handleDelete = (e) => {
    const id = e.target.id
    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'DELETE'
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  componentDidMount () {
    console.log('DIDMOUNT')
    this.handleGetImages()
  }

  render () {
    const images = this.state.images.map((img, index) => {
      return (
        <div key={index} className=''>
          <div className='img_container' onClick={this.showModal}>
            <ImageModal image={img} getImage={this.getImage}/>
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
        </div>
      )
    })
    return (
      <main>
        <div className={this.state.file ? 'upload_bar' : 'upload_bar hide_file_field'}>
          <input ref={this.fileInput} type="file" id="myfile" name="myfile" style={{ display: 'none' }} onChange={(e) =>
            this.handleFile(e)} />
          <button onClick={this.triggerFileHandler}>Choose photo</button>
          <p>{!this.state.file ? '' : this.state.file.name}</p>
          <button onClick={(e) => this.handleUpload(e)}>Upload</button>
        </div>
        <Grid width={300}>{images}</Grid>
      </main>
    )
  }
}

export default PhotoUpload
