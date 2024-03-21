'use client'

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import SideBar from './my-account/sideBar';

function Header() {
  const spanStyle = {
    left: '0px',
    marginLeft: '0px'
  };


  const isLogin = false;




  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container className="row w-100" style={{ display: "contents" }}>
        <div className="col-3 d-flex justify-content-center ">
          <Navbar.Brand href="/" >
            <img src="https://image.invaluable.com/static/header/IN_Red32.svg"
              alt="test" width={"200px"}></img>
          </Navbar.Brand>
        </div>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav">

        </Navbar.Toggle> */}
        <div className="col-5">
          <Form >
            <Row>
              <Col xs="auto" className='w-100'>
                {/* <i className="fa fa-search"></i>
                <Form.Control 
                  type="text"
                  placeholder="Search items & sellers"
                  className="mr-sm-2"
                /> */}
                <div className="input-group">
                  {/* <input className="form-control border-end-0 border" type="search" value="search" id="example-search-input"></input> */}
                  <i className="fa fa-search position-absolute top-50 ps-5 translate-middle" style={{ zIndex: "10", color: "#e4002b" }}></i>

                  <Form.Control
                    type="text"
                    placeholder="Search items & sellers"
                    className="mr-sm-2 ps-5"

                  />

                </div>
              </Col>
            </Row>
          </Form>
        </div>
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}






        <div className="col-4 justify-content-center">
          <Nav className="me-auto justify-content-center">
            <Nav.Link href="/my-account/saved-items">
              <span className="fa fa-heart px-2" style={{ color: "#e4002b", fontSize: "1.6em" }}></span>
              Saved
            </Nav.Link>
            <Nav.Link href="#link">
              <span className="fa fa-bell header-bell px-2" style={{ fontSize: "1.6em", color: "black" }}></span>
              Notifications
            </Nav.Link>
            {/* fa fa-user */}

            {isLogin ? (
              <div className='d-flex'>

                <div className="ps-3 d-flex align-items-center ml-3">
                  <span className="fa fa-user d-flex align-items-center" style={{ fontSize: "1.6em" }}></span>

                </div>
                {/* <div> */}
                {/* </div> */}
                <NavDropdown title="Name user" id="basic-nav-dropdown" className="d-flex align-items-center" >

                  <SideBar></SideBar>

                  {/* </div> */}


                </NavDropdown>

              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <button type="button" className="btn btn-light mx-1 px-3">Login</button>
                <button type="button" className="btn btn-outline-dark">Sign up</button>
              </div>
            )}



          </Nav>
        </div>

        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Header;