'use client'
import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import style from '../style.module.css';
import { PaymentElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkoutFrom';
import QRModal from './qrModal';
import axios from 'axios';
import { HOST } from '@/services/host';
import { UserContext } from '@/services/context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentOptions() {
    const {user, setUser} = useContext(UserContext);
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
    const handleShowModalQRScan = () => {
        
        
        setShowModalQRScan(true);
        // wait 1 s -> print showModalQRScan
        
    
    }

    const makePayment = async() => {
        const url = `${HOST}/account/user/cardPayment`;
        axios.post(url).then((res) => {
            if(res.data.url) {
                window.location.href = res.data.url;
            }
        }). catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        const sessionId = new URLSearchParams(window.location.search).get('session_id'); // Lấy 'session_id' từ query parameter
    
        const handlePayment = async () => {
          console.log(123, user)
            if (sessionId) {
                const url = `${HOST}/account/user/handleCardPayment`;
                try {
                    const response = await axios.post(url, { user_id: user?.id, sessionId }); // Gửi yêu cầu đến máy chủ để xử lý thanh toán
                    if (response.status === 200) {
                      console.log(response.data)
                      if(!response.data.previous) {
                        const newUser = response.data.user; // Không cần tạo đối tượng mới nếu dữ liệu trả về đã là user object hoàn chỉnh
                        setUser(newUser); // Cập nhật thông tin user mới
                        toast.success('Deposit successfully!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                      }
                    }
                } catch (error) {
                    console.error('Error handling payment:', error);
                }
            }
        };

        handlePayment();
    }, [user, setUser]); // useEffect sẽ chạy lại khi user thay đổi

    return (



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
                    onClick={makePayment}


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

            <ToastContainer></ToastContainer>


        </div>
    );
}