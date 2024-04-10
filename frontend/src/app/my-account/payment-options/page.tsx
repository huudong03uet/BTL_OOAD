'use client'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import style from '../style.module.css';


export default function PaymentOptions() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        // <div className='row mx-0'>
        //         <div className={style.div_title}>
        //             Payment Options
        //         </div>
        //         <div className={style.div_section}>
        //             <div className={style.div_header}>
        //                 Credit Cards
        //             </div>
        //             <p>
        //             Add a credit card to make bidding fast and easy.
        //             </p>
        //             <button type="button" className="btn btn-dark px-5">Add A New Card</button>
        //         </div>



        //         <div className={style.div_section}>
        //             <div className={style.div_header}>
        //                 Bank Accounts
        //             </div>
        //             <button type="button" className="btn btn-dark px-5">Add A Bank Account</button>

        //         </div>

        //     {/* </div> */}
        // </div >

        <div className='row mx-0'>
            <div className={style.div_title}>
                Payment Options
            </div>
            <div className={style.div_section}>
                <div className={style.div_header}>
                    Credit Cards
                </div>
                <p>
                    Add a credit card to make bidding fast and easy.
                </p>
                <button type="button" className="btn btn-dark px-5" onClick={handleShowModal}>Add A New Card</button>
            </div>
            <div className={style.div_section}>
                <div className={style.div_header}>
                    Bank Accounts
                </div>
                <button type="button" className="btn btn-dark px-5">Add A Bank Account</button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add A New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" />
                    </div>
                    <p><i className="fa fa-lock" aria-hidden="true"></i><span className='mx-1'>Security server <a rel="noopener noreferrer" target="_blank" style={{ color: "#004bd6" }}>Certified by VikingCloud</a></span></p>
                    <div className="mb-3 d-flex">
                        <input type="text" className="form-control me-2" placeholder="MM/YY" />
                        <input type="text" className="form-control" placeholder="CVN" />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="nameOnCard" placeholder="Name on Card" />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="billingAddress" />
                        <label className="form-check-label" htmlFor="billingAddress">Billing address is same as shipping address</label>
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
                    <button type="button" className="btn btn-dark">Save Card</button>
                    <p className="mx-3" onClick={handleCloseModal}>Cancel</p>
                </Modal.Footer>

            </Modal>
        </div>
    );
}