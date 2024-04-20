'use client'
import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import style from '../style.module.css';
import { useState } from 'react';
import { seller_register } from '@/services/account/seller';
import { UserContext } from '@/services/context/UserContext';


const ModalComponent = () => {

    const {user, setUser} = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);

    const [sellerName, setSellerName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [description, setDescription] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvn, setCvn] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleSaveRequest = async () => {
       

        if (!sellerName || !email || !phoneNumber || !description || !cardNumber || !expiry || !cvn || !nameOnCard || !country || !address || !city || !state || !postalCode) {
            alert("Please fill in all fields before closing the modal.");
        } else {
            alert("Create form register seller successfully!!")
            const seller_info = {
                name: sellerName,
                email: email,
                phone: phoneNumber,
                description: description
            }
    
            const card_info = {
                id: cardNumber,
                expiry: expiry,
                cvn: cvn,
                name_card: nameOnCard,
            }
    
            const location_info = {
                country: country, 
                address: address, 
                city: city, 
                state: state, 
                postal: postalCode
            }
            await seller_register(user?.id, seller_info, card_info, location_info);
            setShowModal(false);
        }
    
    };

    return (
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
                    <input type="text" className="form-control" placeholder="Seller name" value={sellerName} onChange={e => setSellerName(e.target.value)} />
                </div>
                <div className="mb-3 d-flex">
                    <input type="text" className="form-control me-2" placeholder="Email contact" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" className="form-control" placeholder="Phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Description about you" value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="mb-3">
                    Card information
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="cardNumber" placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
                </div>
                <div className="mb-3 d-flex">
                    <input type="text" className="form-control me-2" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
                    <input type="text" className="form-control" placeholder="CVN" value={cvn} onChange={e => setCvn(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="nameOnCard" placeholder="Name on Card" value={nameOnCard} onChange={e => setNameOnCard(e.target.value)} />
                </div>

                <div className="mb-3">
                    Address information
                </div>
                <div className="mb-3">
                    <CountryDropdown
                        classes="form-control"
                        value={country}
                        onChange={val => setCountry(val)}
                    />
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <RegionDropdown
                            classes="form-control"
                            country={country}
                            value={city}
                            onChange={val => setCity(val)}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="state" placeholder="Enter State" value={state} onChange={e => setState(e.target.value)} />
                    </div>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" id="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-start">
                <button type="button" className="btn btn-dark" onClick={handleSaveRequest}>Save Request</button>
                <p style={{ cursor: "pointer" }} className="mx-3" onClick={handleCloseModal}>Cancel</p>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;
