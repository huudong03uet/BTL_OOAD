import { user_sign_up_service } from '@/services/auth/sign_up';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';



function ModalRegister(props: any) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!firstName.trim()) {
            setError('Please enter your email.');
            return;
          }
      
          if (!lastName.trim()) {
            setError('Please enter your password.');
            return;
          }

          if (!email.trim()) {
            setError('Please enter your email.')
          }

          if (!username.trim()) {
            setError('Please enter your user name.');
            return;
          }
      
          if (!password.trim()) {
            setError('Please enter your password.');
            return;
          }

          if (!confirm_password.trim()) {
            setError('Please enter confirm password.')
          }

          if (password != confirm_password) {
            setError('Passwords do not match.')
          }
          
          let err = await user_sign_up_service(firstName, lastName, password, username, email);

          if (typeof err === 'string') {
            setError(err);
          } else {
            setError('');
            props.onHide();
          }
    };

    return (
        <Modal show={props.show} onHide={props.onHide} size="lg">
            <Modal.Header closeButton className='py-3'>
            </Modal.Header>
            <Modal.Body className='pt-2'>
                <h5 className="text-center">Get Started</h5>
                <p className="text-center">Create an account to make bidding fast & easy.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 row justify-content-center">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password (must be 10-50 characters)"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="mb-3 d-flex justify-content-center">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm Password"
                            value={confirm_password}
                            onChange={handleConfirmPassword}
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="newArrivals" />
                        <label className="form-check-label" htmlFor="newArrivals">Email me new arrivals and personalized recommendations from premier auction houses.</label>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="termsOfService" />
                        <label className="form-check-label" htmlFor="termsOfService">I have read and accept Auction's terms of service and privacy policy.</label>
                    </div>
                    <div className='d-flex justify-content-center mb-2'>
                        <button type="submit" className="btn px-4 w-100" style={{ backgroundColor: '#222', color: '#FFFFFF' }}>Continue</button>
                    </div>
                </form>
                
                <div className="social-separator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="social-line" style={{ flex: 1, height: '1px', backgroundColor: 'black', margin: '0 10px' }}></div>
                    <span style={{ margin: '0 10px' }}>OR</span>
                    <div className="social-line" style={{ flex: 1, height: '1px', backgroundColor: 'black', margin: '0 10px' }}></div>
                </div>
                <div className='d-flex justify-content-center mt-2'>
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
                <p className="text-center mt-3">Already have an account? <a onClick={props.switchToLogin} className="color-primary" style={{cursor: "pointer", textDecoration: "none"}}>Sign in</a></p>
                {/* <p className="text-center"><span className="dark-gray-text">By continuing with Google, you agree to Auction's <a href="/agreements/userTerms.cfm" target="_blank">terms of service</a> and <a href="/agreements/privacy.cfm" target="_blank">privacy policy</a>. Auction may send you communications; you can set your preferences in your account.</span></p> */}
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegister;



