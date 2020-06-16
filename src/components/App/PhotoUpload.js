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

  // this.fileInput = React.createRef()
  // this.refArray = []
  // this.trackRefs = []

  // setRef = (ref) => {
  //   // this.trackRefs.push(ref)
  //   // console.log(this.trackRefs)
  //   this.setState({ refArray: [...this.state.refArray, ref] })
  // }

  // setRefs = () => {
  //   // const array = Array(this.state.images.length).fill().map((_, i) => React.createRef())
  //   this.setState({ refArray: Array(this.state.images.length).fill(React.createRef) })
  //   console.log(this.state.refArray)
  //   console.log(this.state.refArray[0].current)
  // }

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
        // this.setRefs()
      })
      .catch(console.error)
  }

  handleDelete = (id, index) => {
    console.log(index)
    axios({
      url: apiUrl + '/uploads/' + id,
      method: 'DELETE'
    })
      .then(() => {
        this.handleGetImages()
        // this.refArray.splice(index, 1)
      })
  }

  handleLike = (image, idIndex) => {
    const id = image._id
    let likes = image.likes
    if (idIndex === -1) {
      likes = likes.concat(this.props.user._id)
    } else {
      likes.splice(idIndex, 1)
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

// const images = this.state.images.map((img, index) => {
//   // find index of user id in likes array
//   const idIndex = img.likes.indexOf(this.props.user._id)
//
//   return (
//     <div className="grid_cell" key={index}>
//       <div className='img_container' >
//         <ImageModal ref={ (ref) => { this.refArray[index] = ref } } className='icon' image={img} />
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
//     </div>
//   )
// })
