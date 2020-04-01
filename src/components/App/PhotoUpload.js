import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'

class PhotoUpload extends Component {
  render () {
    return (
      <div>
        <label>Select a file:</label>
        <input type="file" id="myfile" name="myfile" />
      </div>
    )
  }
}

// export default withRouter(PhotoUpload)
export default PhotoUpload
