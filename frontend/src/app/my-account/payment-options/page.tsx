'use client'
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import style from '../style.module.css';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutFrom';
import QRModal from './qrModal';

export default function PaymentOptions() {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const stripePromise = loadStripe('pk_test_51P5nnuEEyiRNEX94IGdm9D5KhGRBxqU3lKR0Zd6yIRUdq9mSMu1YNmYUxXMMuvJ7KiMw71FFKl2bEfhRwTNwsCYX00LonkWw3K');
    const options: StripeElementsOptions = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
            /*...*/
        },
        
    };




    const [showModalQRScan, setShowModalQRScan] = useState(false);
    const handleCloseModalQRScan = () => setShowModalQRScan(false);
    const handleShowModalQRScan = () => setShowModalQRScan(true);

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
                    QR Scan
                </div>
                <p>
                    Recharge your account with QR code.
                </p>
                <button type="button" className="btn btn-dark px-5" onClick={handleShowModalQRScan}>
                    Scan QR Code
                </button>
            </div>


            <div className={style.div_section}>
                <div className={style.div_header}>
                    Credit Cards
                </div>
                <p>
                    Using your credit card to make bidding fast and easy.
                </p>
                <button
                    onClick={() => {
                        window.open("https://buy.stripe.com/test_fZe9AZ7Q61ScgXS8wx", "_blank")


                    }}


                    // onClick={handleShowModal}

                    type="button" className="btn btn-dark px-5">Using a card</button>
            </div>
            {/* <div className={style.div_section}>
                <div className={style.div_header}>
                    Bank Accounts
                </div>
                <button type="button" className="btn btn-dark px-5"
                // https://buy.stripe.com/test_aEU6oN6M2eEY9vq288
                
            
                
            
                >Add A Bank Account</button>
            </div> */}

            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add A New Card</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Elements stripe={stripePromise} options={options}>
                        <CheckoutForm />
                    </Elements>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    {/* <button type="button" className="btn btn-dark">Save Card</button> */}
                    <p className="mx-3" onClick={handleCloseModal}>Cancel</p>
                </Modal.Footer>

            </Modal>
            <div>
                <QRModal showModalQRScan={showModalQRScan} handleCloseModalQRScan={handleCloseModalQRScan} />
            </div>


        </div>
    );
}