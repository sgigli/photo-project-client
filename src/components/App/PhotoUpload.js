import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Grid from 'react-css-grid'
import { FiTrash2 } from 'react-icons/fi'
import { FaRegCommentAlt } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'
// import { IconContext } from 'react-icons'
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
    this.modal = React.createRef()
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
    formdata.append('owner', this.props.user._id)

    console.log(formdata)

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
    console.log(e.target)
    console.log(id)
    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'DELETE'
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  handleLike = (id, index, likes) => {
    if (index === -1) {
      likes = likes.concat(this.props.user._id)
    } else {
      likes.splice(index, 1)
    }

    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'PATCH',
      data: {
        'upload': {
          'likes': likes
        }
      }
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  componentDidMount () {
    this.handleGetImages()
  }

  // <div className="FiTrash2Clear">
  //   <FiTrash2 onClick={this.handleDelete} id={img._id} className="FiTrash2"/>
  // </div>

  // <FiTrash2 onClick={this.handleDelete} id={img._id} className="FiTrash2"/>

  render () {
    const images = this.state.images.map((img, index) => {
      // find index of user id in likes array
      const idIndex = img.likes.indexOf(this.props.user._id)

      return (
        <div className="grid_cell" key={index}>
          <div className='img_container' >
            <ImageModal ref={this.modal} className='icon' image={img} />
          </div>
          <div className='img_bar'>
            <AiFillLike id={img._id} data-index={index} onClick={() => this.handleLike(img._id, idIndex, img.likes)}
              className={idIndex !== -1 ? 'AiFillLike-LikedByUser' : 'AiFillLike' }/>
            <p className='bar_info'>{img.likes.length}</p>
            <FaRegCommentAlt className='FaRegCommentAlt' onClick={() => this.modal.current.callHandleShow()}/>
            <p className='bar_info'>{img.comments.length}</p>
            {img.owner._id === this.props.user._id ? <FiTrash2 onClick={this.handleDelete} id={img._id} className="FiTrash2"/> : ''}
            <div style={{ clear: 'both' }}></div>
            <p className='username'>posted by {img.owner.username}</p>
          </div>
        </div>
      )
    })
    return (
      <main>
        <div className={this.state.file ? 'upload_bar' : 'upload_bar hide_file_field'}>
          <input ref={this.fileInput} type="file" id="myfile" name="myfile" style={{ display: 'none' }} onChange={(e) =>
            this.handleFile(e)} />
          <button className='.btn btn-primary' onClick={this.triggerFileHandler}>Choose photo</button>
          {!this.state.file ? '' : <p>{this.state.file.name}</p>}
          <button type='button' className='.btn btn-default' disabled={this.state.file ? '' : 'disabled'} onClick={(e) => this.handleUpload(e)}>Upload</button>
        </div>
        <Grid width={300} justify-items='center'>{images}</Grid>
      </main>
    )
  }
}

export default PhotoUpload
