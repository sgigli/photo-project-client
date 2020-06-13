import React, { Fragment, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user, setFile }) => {
  const fileInput = useRef(null)
  const [image, setImage] = useState(null)

  const triggerFileHandler = (e) => {
    console.log('test')
    fileInput.current.click()
  }

  const handleFile = (e) => {
    console.log(e.target.files[0])
    const img = e.target.files[0]
    setImage(img)
  }

  const sendFile = (e) => {
    setFile(image)
    setImage(null)
    fileInput.current.value = null
  }

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand href="#">
        Photo Project
        { user &&
          <span>
            <input ref={fileInput} type="file" id="myfile" name="myfile" style={{ display: 'none' }} onChange={handleFile} />
            <button className='btn btn-primary' onClick={triggerFileHandler}>Choose photo</button>
            <button className='btn btn-primary' onClick={sendFile} disabled={ image ? '' : 'disabled' }>Upload</button>
          </span>
        }
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { alwaysOptions }
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
