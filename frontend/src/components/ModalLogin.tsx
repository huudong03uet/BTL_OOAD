"use client"
import { user_login_service } from '@/services/auth/login';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalLogin(props: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (!username.trim()) {
      setError('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    let err = await user_login_service(password, username)

    if (typeof err === 'string') {
      setError(err);
    } else {
      setError(null);
      // props.setIsLogin(true);
      props.onHide();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} backdrop="static" size="lg">
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <h5 className="text-center">Welcome Back</h5>
        <p className="text-center">Log in to view your account and personalized recommendations.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

          <div className="mb-3 d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="keepLoggedIn" />
              <label className="form-check-label" htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <div className='d-flex justify-content-center mb-4'>
            <button type="submit" className="btn px-4  w-100" style={{ backgroundColor: '#222', color: '#FFFFFF' }}>Login</button>
          </div>
        </form>
        <div className="social-separator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="social-line" style={{ flex: 1, height: '1px', backgroundColor: 'black', margin: '0 10px' }}></div>
          <span style={{ margin: '0 10px' }}>OR</span>
          <div className="social-line" style={{ flex: 1, height: '1px', backgroundColor: 'black', margin: '0 10px' }}></div>
        </div>
        <div className='d-flex justify-content-center mt-4'>
          <button
            type="button"
            style={{
              color: '#000',
              backgroundColor: '#fff',
              border: '1px solid #000',
              padding: '10px 40px',
              borderRadius: '5px'
            }}
          >
            Sign in with Google
          </button>
        </div>
        <p className="text-center mt-4">Don't have an account? <a onClick={props.switchToRegister} className="color-primary" style={{cursor: "pointer", textDecoration: "none"}}>Sign up</a></p>
        {/* <p className="text-center">
          <span className="dark-gray-text">By continuing with Google, you agree to Invaluable's <a href="/agreements/userTerms.cfm" target="_blank">terms of service</a> and <a href="/agreements/privacy.cfm" target="_blank">privacy policy</a>. Invaluable may send you communications; you can set your preferences in your account.</span>
        </p> */}
      </Modal.Body>
    </Modal>
  );
}

export default ModalLogin;