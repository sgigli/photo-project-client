import React, { Fragment, useRef, useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'
import { FaCameraRetro } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

const Header = ({ user, setFile, setUser, msgAlert, history }) => {
  const fileInput = useRef(null)
  const [image, setImage] = useState(null)

  const triggerFileHandler = (e) => {
    fileInput.current.click()
  }

  const handleFile = (e) => {
    const img = e.target.files[0]
    setImage(img)
  }

  const sendFile = (e) => {
    setFile(image)
    setImage(null)
    fileInput.current.value = null
  }

  const onDemoSignIn = (e) => {
    e.preventDefault()

    signIn(demoCredentials)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  const demoCredentials = {
    email: 'roger-federer@aol.com',
    password: 'FedExpress123'
  }

  const authenticatedOptions = (
    <Fragment>
      <Nav.Link href="#/">Home</Nav.Link>
      <NavDropdown alignRight title={<FiSettings size={20}/>}>
        <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
        <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Fragment>
  )

  const unauthenticatedOptions = (
    <Fragment>
      <button className="btn btn-primary demo" onClick={onDemoSignIn}>Demo</button>
      <Nav.Link href="#sign-up">Sign Up</Nav.Link>
      <Nav.Link href="#sign-in">Sign In</Nav.Link>
    </Fragment>
  )

  return (
    <Navbar style={{ backgroundColor: '#f2f2f2' }} variant="light" expand="md">
      <Navbar.Brand href="#">
        Photopia
        <FaCameraRetro className='FaCameraRetro' size={30}/>
        { user &&
          <span>
            <input ref={fileInput} type="file" id="myfile" name="myfile" style={{ display: 'none' }} onChange={handleFile} />
            <button className='btn upload-btns choose' onClick={triggerFileHandler}>Choose photo</button>
            <button className={ image ? 'btn upload upload-btns' : 'btn upload' } onClick={sendFile} disabled={ image ? '' : 'disabled' }>Upload</button>
          </span>
        }
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span className="navbar-text mr-2">Welcome, {user.username}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header
