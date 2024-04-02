
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FormRegisterSeller } from '@/types/form_register_seller';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    sellerInformation: FormRegisterSeller;
}
function CreateModal(props: IProps) {

    const { showModalCreate, setShowModalCreate, sellerInformation } = props;

    const handleCloseModal = () => setShowModalCreate(false);
    const handleShowModal = () => setShowModalCreate(true);

    // const [sellerID, setSellerID] = useState('');
    // const [sellerName, setSellerName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [description, setDescription] = useState('');
    // const [cardNumber, setCardNumber] = useState('');
    // const [expiry, setExpiry] = useState('');
    // const [cvn, setCvn] = useState('');
    // const [nameOnCard, setNameOnCard] = useState('');
    // const [country, setCountry] = useState('');
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [state, setState] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    // const [timeCreate, setTimeCreate] = useState('');
    // const [status, setStatus] = useState('');

    const sellerID = sellerInformation.user_id;
    const sellerName = sellerInformation.name;
    const email = sellerInformation.email;
    const phoneNumber = sellerInformation.phoneNumber;
    const description = sellerInformation.description;
    const cardNumber = sellerInformation.card_number;
    const expiry = sellerInformation.expiry;
    const cvn = sellerInformation.cvn;
    const nameOnCard = sellerInformation.nameOnCard;
    const country = sellerInformation.country;
    const address = sellerInformation.address;
    const city = sellerInformation.city;
    const state = sellerInformation.state;
    const postalCode = sellerInformation.postalCode;
    const timeCreate = sellerInformation.time_create;
    const status = sellerInformation.state


    const handleSubmit = () => {

    }

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Seller Registration Request
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    <div className="mb-3">
                        <strong>Seller Information:</strong>
                    </div>
                    <div className="mb-3">
                        <p><strong>Seller Name:</strong> {sellerName}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Email:</strong> {email}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Phone Number:</strong> {phoneNumber}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Description:</strong> {description}</p>
                    </div>
                    <div className="mb-3">
                        <strong>Card Information:</strong>
                    </div>
                    <div className="mb-3">
                        <p><strong>Card Number:</strong> {cardNumber}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Expiry:</strong> {expiry}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>CVN:</strong> {cvn}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Name on Card:</strong> {nameOnCard}</p>
                    </div>

                    <div className="mb-3">
                        <strong>Address Information:</strong>
                    </div>
                    <div className="mb-3">
                        <p><strong>Country:</strong> {country}</p>
                    </div>
                    <div className="mb-3">
                        <p><strong>Address:</strong> {address}</p>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <p><strong>City:</strong> {city}</p>
                        </div>
                        <div className="col">
                            <p><strong>State:</strong> {state}</p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p><strong>Postal Code:</strong> {postalCode}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <Button variant="secondary" onClick={() => setShowModalCreate(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Accept</Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Reject</Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default CreateModal;