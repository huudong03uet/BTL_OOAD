import React from 'react';
import Modal from 'react-bootstrap/Modal';

function ModalRegister(props: any) {
    return (
        <Modal show={props.show} onHide={props.onHide} size="lg">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body >
                <h5 className="text-center">Get Started</h5>
                <p className="text-center">Create an account to make bidding fast & easy.</p>
                <div className="mb-3 row justify-content-center">
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="First Name" />
                    </div>
                    <div className="col-md-6">
                        <input type="text" className="form-control" placeholder="Last Name" />
                    </div>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <input type="email" className="form-control" placeholder="Email" />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <input type="password" className="form-control" placeholder="Password (must be 10-50 characters)" />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <input type="password" className="form-control" placeholder="Confirm Password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="newArrivals" />
                    <label className="form-check-label" htmlFor="newArrivals">Email me new arrivals and personalized recommendations from premier auction houses.</label>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="termsOfService" />
                    <label className="form-check-label" htmlFor="termsOfService">I have read and accept Invaluable's terms of service and privacy policy.</label>
                </div>
                <div className='d-flex justify-content-center mb-4'>
                    <button type="button" className="btn px-4 w-100" style={{ backgroundColor: '#222', color: '#FFFFFF' }}>Continue</button>
                </div>
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
                <p className="text-center mt-4">Already have an account? <a href="#">Sign in</a></p>
                <p className="text-center"><span class="dark-gray-text">By continuing with Google, you agree to Invaluable's <a href="/agreements/userTerms.cfm" target="_blank">terms of service</a> and <a href="/agreements/privacy.cfm" target="_blank">privacy policy</a>. Invaluable may send you communications; you can set your preferences in your account.</span></p>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRegister;
