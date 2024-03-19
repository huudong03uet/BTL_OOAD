'use client'
import { Container, Button, Form, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import style from '../style.module.css';
import React, { useState } from 'react';
import SideBarMyAccount from "@/components/my-account/sideBar";
import { CountryDropdown, RegionDropdown, CountryRegionData } from "react-country-region-selector";


export default function EditProfile() {
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
            {/* <div className="col-2">
                <SideBarMyAccount />
            </div> */}
            {/* <div className="col-10 px-5"> */}
            <div className={style.div_title}>
                Edit Profile
            </div>
            <div className={style.div_section}>
                <div className={style.div_header}>
                    Account Info
                </div>
                <div className="row">
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="First name"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.firstName}
                        />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.lastName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Control
                            type="text"
                            defaultValue={accountInfo.email}
                            className={style.custom_form_control}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">

                    <div className="col-6">
                        <Form.Control type="text"
                            defaultValue={accountInfo.password}
                            className={style.custom_form_control}
                            disabled
                        />
                    </div>
                </div>
            </div>



            <div className={style.div_section}>
                <div className={style.div_header}>
                    Shipping Address
                </div>
                <div className="row">
                    <div className="col-6">
                        {/* <Form.Control
                                type="text"
                                placeholder="Selected Country"
                                className={style.custom_form_control}
                                defaultValue={accountInfo.selectedCountry ? accountInfo.selectedCountry: ""}
                            /> */}
                        <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)}
                            classes={style.custom_form_control_selected}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-6">
                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)}


                            classes={style.custom_form_control_selected}
                        />
                    </div>
                    {/* <div className="col-6">
                            <Form.Control type="text"
                                placeholder="City"
                                className={style.custom_form_control}
                                defaultValue={accountInfo.city ? accountInfo.city : ""}
                            />
                        </div> */}
                </div>

                <div className="row">
                    <div className="col-6">
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.address ? accountInfo.address : ""}
                        />
                    </div>
                </div>


                <div className="row">

                    <div className="col-3">
                        <Form.Control type="text"
                            placeholder="State"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.state ? accountInfo.state : ""}

                        />
                    </div>
                    <div className="col-3">
                        <Form.Control type="text"
                            placeholder="Postal code"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.postalCode ? accountInfo.postalCode : ""}
                        />
                    </div>
                </div>
                <div className="row">

                    <div className="col-6">
                        <Form.Control type="text"
                            placeholder="Phone number"
                            className={style.custom_form_control}
                            defaultValue={accountInfo.phoneNumber ? accountInfo.phoneNumber : ""}
                        />
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-dark mb-4">Save Changes</button>

        </div>
        // </div >
    );
}