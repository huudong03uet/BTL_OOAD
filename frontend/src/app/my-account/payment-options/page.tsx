'use client'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import style from '../style.module.css';
import React, { useState } from 'react';
import SideBarMyAccount from "@/components/my-account/sideBar";
import { CountryDropdown, RegionDropdown, CountryRegionData } from "react-country-region-selector";


export default function PaymentOptions() {
    const accountInfo = {
        "firstName": "test",
        "lastName": "test 2",
        "email": "xxx@gmail.com",
        "password": "********",
        "selectedCountry": null,
        "address": null,
        "city": null,
        "state": null,
        "postalCode": null,
        "phoneNumber": null
    }
    const [country, setCountry] = useState('Vietnam');
    const [region, setRegion] = useState('');


    const selectCountry = (val: string) => {
        setCountry(val);
        console.log(val)
    };

    const selectRegion = (val: string) => {
        setRegion(val);
    };

    return (
        <div className='row mx-0'>
            <div className="col-2">
                <SideBarMyAccount />
            </div>
            <div className="col-10 px-5">
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
                    <button type="button" className="btn btn-dark px-5">Add A New Card</button>
                </div>



                <div className={style.div_section}>
                    <div className={style.div_header}>
                        Bank Accounts
                    </div>
                    <button type="button" className="btn btn-dark px-5">Add A Bank Account</button>
                   
                </div>

            </div>
        </div >
    );
}