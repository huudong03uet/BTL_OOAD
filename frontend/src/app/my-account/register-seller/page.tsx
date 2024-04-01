


'use client'
import { Modal } from 'react-bootstrap';
import style from '../style.module.css';
import { useState } from 'react';

export default function PaymentOptions() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    const registeredSeller: boolean = true;

    return (
        <div className='row mx-0'>
            <div className={style.div_title}>
                Seller register
            </div>

            <div className={style.div_section}>
                <div className={style.div_header}>
                    Request for Seller Account
                </div>
                {
                    registeredSeller ? (
                        <div>
                            <button type="button" className="btn btn-dark px-5"  disabled>Request Processing</button>
                        </div>
                    ) : (
                            <button type="button" className="btn btn-dark px-5" onClick={handleShowModal}>Register as Seller</button>


                    )
                }
            </div >









            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Register to become a seller
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        Seller information
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="cardNumber" placeholder="Seller name" />
                    </div>
                    <div className="mb-3 d-flex">
                        <input type="text" className="form-control me-2" placeholder="Email contact" />
                        <input type="text" className="form-control" placeholder="Phone number" />
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" id="cardNumber" placeholder="Description about you" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="nameOnCard" placeholder="Topic product sell (optional)" />

                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="cardNumber" placeholder="Text send to admin (optional)" />
                    </div>

                    <div className="mb-3">
                        Card information
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" />
                    </div>
                    <div className="mb-3 d-flex">
                        <input type="text" className="form-control me-2" placeholder="MM/YY" />
                        <input type="text" className="form-control" placeholder="CVN" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="nameOnCard" placeholder="Name on Card" />
                    </div>

                    <div className="mb-3">
                        Address information
                    </div>
                    <div className="mb-3">
                        <select className="form-select" id="country">
                            <option>Select Country</option>
                            {/* Thêm các option cho select country */}
                        </select>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="address" placeholder="Enter Address" />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" id="city" placeholder="Enter City" />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" id="state" placeholder="Enter State" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="postalCode" placeholder="Enter Postal Code" />
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <button type="button" className="btn btn-dark">Save Request</button>
                    <p style={{ cursor: "pointer" }} className="mx-3" onClick={handleCloseModal}>Cancel</p>
                </Modal.Footer>

            </Modal>


        </div >
    );
}