import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import SideBar from './my-account/sideBarUser';
import UserDataService from '@/services/model/user';
import Popover from '@mui/material/Popover';
import Notifications from './Notification';
function Header() {
  // const spanStyle = {
  //   left: '0px',
  //   marginLeft: '0px'
  // };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // }
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLButtonElement);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // const isLogin = false;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isLogin = UserDataService.getUserData()?.user_id == null ? false : true;
  //  UserDataService.getUserData()?.user_id == null ? false : true;



  const handleLoginModalClose = () => setShowLoginModal(false);
  const handleRegisterModalClose = () => setShowRegisterModal(false);

  const handleSwitchToRegister = () => {
    setShowLoginModal(false); // Ẩn modal đăng nhập
    setShowRegisterModal(true); // Hiển thị modal đăng ký
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false); // Ẩn modal đăng ký
    setShowLoginModal(true); // Hiển thị modal đăng nhập
  };

  //Xử lý search
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchText(e.target.value);
  };

  const handleKeyPress = (e: { key?: any; preventDefault: any; }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        const response = await fetch('/api/yourEndpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ searchText })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Handle response data as needed
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  };

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleNotificationMouseEnter = () => setShowNotificationModal(true);
  const handleNotificationMouseLeave = () => setShowNotificationModal(false);

  const handleMarkAllAsRead = () => {
  };

  const handleDeleteAll = () => {
  };

  const handleNotificationSettings = () => {
  };

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

                <div className="input-group border-right-0 rounded border-dark">
                  <i className="fa fa-search position-absolute top-50 ps-5 translate-middle" style={{ zIndex: "10", color: "#e4002b" }}></i>

                  <input
                    type="text"
                    placeholder="Search items & sellers"
                    className="mr-sm-2 ps-5 w-100 border rounded border-dark"
                    value={searchText}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />

                </div>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="col-4 justify-content-center">
          <Nav className="me-auto justify-content-center">
            <Nav.Link href="/my-account/saved-items">
              <span className="fa fa-heart px-2" style={{ color: "#e4002b", fontSize: "1.6em" }}></span>
              Saved
            </Nav.Link>

            {/* <Nav.Link href="#link" 
            
            onClick={() => setShowNotificationModal(true)}
            // onMouseEnter={handleNotificationMouseEnter}
              onMouseLeave={handleNotificationMouseLeave}
          
              
        
            >
              <span className="fa fa-bell header-bell px-2" style={{ fontSize: "1.6em", color: "black" }}></span>
              Notifications
              <ModalNotification
                show={showNotificationModal}
                onHide={() => setShowNotificationModal(false)}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteAll={handleDeleteAll}
                onNotificationSettings={handleNotificationSettings}
              />
            </Nav.Link> */}
            <Nav.Link>
              {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
              </Button> */}
              <div aria-describedby={id} onClick={handleClick} style={{ cursor: "pointer" }}>
                <span className="fa fa-bell header-bell px-2" style={{ fontSize: "1.6em", color: "black" }}></span>
                Notifications
              </div>
             
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}


                className='mt-3'
              >
                <Notifications
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onDeleteAll={handleDeleteAll}
                  onNotificationSettings={handleNotificationSettings}

                
                ></Notifications>
                {/* <Typography sx={{ p: 2 }}>The content of the Posưqqqqqqqqqqqqqqqqqqpover.</Typography> */}
              </Popover>
            </Nav.Link>
            {/* fa fa-user */}

            {isLogin ? (
              <div className='d-flex'>

                <div className="ps-3 d-flex align-items-center ml-3">
                  <span className="fa fa-user d-flex align-items-center" style={{ fontSize: "1.6em" }}></span>

                </div>
                {/* <div> */}
                {/* </div> */}
                <NavDropdown title="Name user" id="basic-nav-dropdown" className="d-flex align-items-center" 
                align={{ lg: 'end' }}
                >

                  <NavDropdown.Item href="/my-account/home">My account</NavDropdown.Item>
                  <NavDropdown.Item href="/my-account/saved-items">Saved items</NavDropdown.Item>
                  <NavDropdown.Item href="/my-account/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/seller">Selling center</NavDropdown.Item>

                  <NavDropdown.Divider/>
                  {/* payment-options */}

                  <NavDropdown.Item href="/my-account/payment-options">Payment options</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                  {/* <div className="d-flex align-items-center"> */}
                  
                  {/* </div> */}


                </NavDropdown>

              </div>
            ) : (
              <div className='d-flex align-items-center'>
                <button type="button" className="btn btn-light mx-1 px-3" onClick={() => setShowLoginModal(true)}>Login</button>
                <button type="button" className="btn btn-outline-dark" onClick={() => setShowRegisterModal(true)}>Sign up</button>
              </div>
            )}



          </Nav>
        </div>

        {/* Hiển thị modal khi showLoginModal hoặc showRegisterModal được set thành true */}
        {/* <ModalLogin show={showLoginModal} onHide={handleLoginModalClose} />
        <ModalRegister show={showRegisterModal} onHide={handleRegisterModalClose} /> */}
        <ModalLogin show={showLoginModal} onHide={handleLoginModalClose} switchToRegister={handleSwitchToRegister}/>
        <ModalRegister show={showRegisterModal} onHide={handleRegisterModalClose} switchToLogin={handleSwitchToLogin} />

        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default Header;