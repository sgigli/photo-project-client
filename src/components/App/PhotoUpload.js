import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Grid from 'react-css-grid'
import ImageModal from './Modal'

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      images: []
    }
  }

  handleUpload = (file) => {
    const formdata = new FormData()
    formdata.append('file', file)
    formdata.append('owner', this.props.user._id)

    axios({
      url: apiUrl + '/uploads',
      method: 'POST',
      data: formdata
    })
      .then(() => {
        this.handleGetImages()
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

  handleDelete = (id, index) => {
    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'DELETE'
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  handleLike = (imageId, idIndex) => {
    axios({
      url: apiUrl + '/uploads/' + imageId,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        'upload': {
          'likeIdIndex': idIndex
        }
      }
    })
      .then(() => {
        this.handleGetImages()
      })
  }

  componentDidMount () {
    if (this.props.file) {
      this.handleUpload(this.props.file)
    }
    this.handleGetImages()
  }

  render () {
    if (this.props.file) {
      this.handleUpload(this.props.file)
    }

    const images = this.state.images.map((image, index) => {
      return <ImageModal
        key={index}
        image={image}
        user={this.props.user}
        handleLike={this.handleLike}
        handleDelete={this.handleDelete}
        handleGetImages={this.handleGetImages}
      />
    })

    return (
      <main>
        <Grid width={300} justify-items='center'>{images}</Grid>
      </main>
    )
  }
}

export default PhotoUpload
