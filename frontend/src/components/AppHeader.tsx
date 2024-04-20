import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import Popover from '@mui/material/Popover';
import Notifications from './Notification';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import ModalConfirm from './ModalConfirm';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter



import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '@/services/context/UserContext';
import { SellerContext } from '@/services/context/SellerContext';
import { loginFromToken } from '@/services/auth/login';
import { get_seller_by_user } from '@/services/account/seller';
import Product from '@/models/product';



function Header() {
  // const spanStyle = {
  //   left: '0px',
  //   marginLeft: '0px'
  // };
  const {user, setUser} = useContext(UserContext);
  const {seller, setSeller} = useContext(SellerContext);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await loginFromToken();
      console.log(setUser);
      setUser(userData);
      try {
        let data = await get_seller_by_user(user?.id);
        if(data) {
          setSeller(data);
        }
      } catch (err) {
        console.log(err)
      }

    };
    fetchData(); 
  }, [setUser, setSeller]); 

  const router = useRouter(); // Get router instance

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
      // handleSubmit(e);
      // link to /search page and pass searchText as query
      router.push(`/search?searchText=${searchText}`);
    }
  };

  // const handleSubmit = (e: { preventDefault: () => void; }) => {
  //   e.preventDefault();

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/yourEndpoint', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ searchText })
  //       });

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const data = await response.json();
  //       console.log(data); // Handle response data as needed
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // };

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleNotificationMouseEnter = () => setShowNotificationModal(true);
  const handleNotificationMouseLeave = () => setShowNotificationModal(false);

  const handleMarkAllAsRead = () => {
  };

  const handleDeleteAll = () => {
  };

  const handleNotificationSettings = () => {
  };



  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  
  const [showModal, setShowModal] = useState<boolean>(false); // State for modal visibility


  const handleConfirmSignout = () => {
    toast.success('Logout successfully!', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setShowModal(false);
    setSeller(null);
    setUser(null);

    
    
    // alert('Đăng xuất thành công!');

  };

  const handleCancelSignout = () => {
    setShowModal(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary py-0">
      <Container className="row w-100" style={{ display: "contents" }}>
        <div className="col-3 d-flex justify-content-center ">
          <Navbar.Brand onClick={() => router.push("/")} className='py-1'>
            <img src="/logo.png"
              alt="test" width={"200px"}></img>
          </Navbar.Brand>
        </div>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav">

        </Navbar.Toggle> */}
        <div className="col-4">
          <Form >
            <Row>
              <Col xs="auto" className='w-100'>

                <div className="input-group border-right-0 rounded border-dark">
                  <i className="fa fa-search position-absolute top-50 ps-5 translate-middle" style={{ zIndex: "10", color: "#e4002b" }}></i>

                  <input
                    type="text"
                    placeholder="Search items & sellers"
                    className="mr-sm-2 ps-5 w-100 border rounded border-dark py-1"
                    value={searchText}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />

                </div>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="col-5 justify-content-center">
          <Nav className="me-auto justify-content-center">
            {/* <Nav.Link onClick={() => router.push("/my-account/saved-items")}>
              <span className="fa fa-coins px-2" style={{ color: "black" , fontSize: "1.6em" }}></span>
              *{' '}Đ
            </Nav.Link> */}
            <div className='d-flex align-items-center'>
              {/* <span className="fa fa-coins px-1" style={{ color: "#FAB005", fontSize: "1.6em" }}></span> */}
              <img src="/img/money.png" alt="test" width={"30px"}></img>
              <FormControl sx={{ m: 1, width: '15ch', color: "black" }}  disabled>
                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                <Input
                  // set color text black


                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  defaultValue= { user?.coin }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        
                      </IconButton>
                    </InputAdornment>
                  }
                // label="Password"
                />
              </FormControl>
            </div>


            <div className='d-flex align-items-center'>
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
            </div>




            {/* <Nav.Link onClick={() => router.push("#link")}
            
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

            {/* fa fa-user */}

            {user ? (
              <div className='d-flex'>

                <div className="ps-3 d-flex align-items-center ml-3">
                  <span className="fa fa-user d-flex align-items-center" style={{ fontSize: "1.6em" }}></span>

                </div>
                {/* <div> */}
                {/* </div> */}
                <NavDropdown title={user?.user_name || "user_name" } id="basic-nav-dropdown" className="d-flex align-items-center"
                  align={{ lg: 'end' }}
                >

                  <NavDropdown.Item onClick={() => router.push("/my-account/home")}>My account</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => router.push("/my-account/saved-items")}>Saved items</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => router.push("/my-account/settings")}>Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => router.push("/seller")}>Selling center</NavDropdown.Item>

                  <NavDropdown.Divider />
                  {/* payment-options */}

                  <NavDropdown.Item  onClick={() => router.push('/my-account/payment-options')}>Payment options</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item  onClick={() => setShowModal(true)}>Log out</NavDropdown.Item>
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
        <ModalLogin show={showLoginModal} onHide={handleLoginModalClose} switchToRegister={handleSwitchToRegister} />
        <ModalRegister show={showRegisterModal} onHide={handleRegisterModalClose} switchToLogin={handleSwitchToLogin} />

        {/* </Navbar.Collapse> */}
      </Container>

      {showModal && (
            <ModalConfirm // Pass show prop with state value
              show={showModal}
              onConfirm={handleConfirmSignout}
              onCancel={handleCancelSignout}
            />
          )}

    </Navbar>
  );
}

export default Header;