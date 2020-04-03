import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class PhotoUpload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: null
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
    console.log(formdata.getAll('file'))
    console.log(formdata['file'])
    // formdata.append('name', 'Simon Gigli')

    axios({
      url: apiUrl + '/uploads',
      method: 'patch'
    })
      .then(console.log)
      .catch(console.error)
  }

  render () {
    return (
      <div>
        <label>Select a file:</label>
        <input type="file" id="myfile" name="myfile" onChange={(e) =>
          this.handleFile(e)} />
        <button onClick={(e) => this.handleUpload(e)}>Upload</button>
      </div>
    )
  }
}

// export default withRouter(PhotoUpload)
export default PhotoUpload
