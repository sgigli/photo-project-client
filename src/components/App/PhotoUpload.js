import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Image from 'react-bootstrap/Image'

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null,
      images: []
    }
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
      .then(console.log)
      .catch(console.error)
  }

  handleGetImages (e) {
    axios({
      url: apiUrl + '/uploads',
      method: 'GET'
    })
      .then(res => {
        console.log(res.data.uploads)
        const images = res.data.uploads
        this.setState({ images: images })
      })
      .catch(console.error)
  }

  render () {
    const images = this.state.images.map((img, index) => {
      return (
        <li key={index}>
          <div className='img_container'>
            <Image src={img.fileUrl} thumbnail />
          </div>
          <div className='img_bar'>
          </div>
        </li>
      )
    })
    return (
      <div>
        <label>Select a file:</label>
        <input type="file" id="myfile" name="myfile" onChange={(e) =>
          this.handleFile(e)} />
        <button onClick={(e) => this.handleUpload(e)}>Upload</button>
        <button onClick={(e) => this.handleGetImages(e)}>Get Images</button>
        <ul>{images}</ul>
      </div>
    )
  }
}

// export default withRouter(PhotoUpload)
export default PhotoUpload
