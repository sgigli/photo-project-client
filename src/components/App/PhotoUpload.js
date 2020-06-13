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
    this.trackRefs = []
  }

  setRef = (ref) => {
    this.trackRefs.push(ref)
  }

  triggerFileHandler = (e) => {
    this.fileInput.current.click()
  }

  handleFile = (e) => {
    const file = e.target.files[0]
    this.setState({ file: file })
  }

  // handleUpload = (e) => {
  //   const file = this.state.file
  //   const formdata = new FormData()
  //   formdata.append('file', file)
  //   formdata.append('owner', this.props.user._id)
  //
  //   console.log(formdata)
  //
  //   axios({
  //     url: apiUrl + '/uploads',
  //     method: 'POST',
  //     data: formdata
  //   })
  //     .then(() => {
  //       this.handleGetImages()
  //       this.fileInput.current.value = null
  //     })
  // }

  handleUpload = (file) => {
    console.log('test', file)
    // const file = this.state.file
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
        this.props.setFile(null)
      })
  }

  handleGetImages = (e) => {
    axios({
      url: apiUrl + '/uploads',
      method: 'GET'
    })
      .then(res => {
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
    console.log(this.props.file)
    if (this.props.file) {
      this.handleUpload(this.props.file)
    }
    this.handleGetImages()
  }

  render () {
    if (this.props.file) {
      this.handleUpload(this.props.file)
    }

    const images = this.state.images.map((img, index) => {
      // find index of user id in likes array
      const idIndex = img.likes.indexOf(this.props.user._id)

      return (
        <div className="grid_cell" key={index}>
          <div className='img_container' >
            <ImageModal ref={this.setRef} className='icon' image={img} />
          </div>
          <div className='img_bar'>
            <AiFillLike id={img._id} data-index={index} onClick={() => this.handleLike(img._id, idIndex, img.likes)}
              className={idIndex !== -1 ? 'AiFillLike-LikedByUser' : 'AiFillLike' }/>
            <p className='bar_info'>{img.likes.length}</p>
            <FaRegCommentAlt className='FaRegCommentAlt' onClick={() => this.trackRefs[index].callHandleShow()}/>
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
          <button className='.btn btn-primary choose' onClick={this.triggerFileHandler}>Choose photo</button>
          {!this.state.file ? '' : <p>{this.state.file.name}</p>}
          <button type='button' className='.btn btn-default' disabled={this.state.file ? '' : 'disabled'} onClick={(e) => this.handleUpload(e)}>Upload</button>
        </div>
        <Grid width={300} justify-items='center'>{images}</Grid>
      </main>
    )
  }
}

export default PhotoUpload
