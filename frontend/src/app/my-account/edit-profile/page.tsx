'use client'
import {  Form,  } from "react-bootstrap";
import style from '../style.module.css';
import React, { useState, useEffect, ChangeEvent  } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import User from "@/models/user";
import UserDataService from "@/services/model/user";
import edit_account_service from "@/services/my_account/edit_account";


export default function EditProfile() {
    const [user, setUser] = useState<User>({
        user_id: 0,
        username: '',
        evaluate: '',
        coin: 0,
        firstName: '',
        lastName: '',
        email: '',
        country: 'Vietnam',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        phone: ''
    });

    useEffect(() => {
        const userData = UserDataService.getUserData();
        if (userData) {
            setUser(prevUser => ({
                ...prevUser,
                user_id: userData.user_id,
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                evaluate: userData.evaluate,
                country: userData.country,
                address: userData.address,
                city: userData.city,
                state: userData.state,
                postal_code: userData.postal_code,
                phone: userData.phone
            }));
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const selectCountry = (val: string) => {
        setUser(prevUser => ({
            ...prevUser,
            country: val
        }));
    };

    const selectCity = (val: string) => {
        setUser(prevUser => ({
            ...prevUser,
            city: val
        }));
    };

    const handleClick = async () => {
        await edit_account_service(user);
    }

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
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            className={style.custom_form_control}
                            name="firstName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Control
                            type="text"
                            defaultValue={user.email}
                            className={style.custom_form_control}
                            disabled
                        />
                    </div>
                </div>

                <div className="row">

                    <div className="col-6">
                        <Form.Control type="text"
                            defaultValue={'********'}
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
                                defaultValue={accountInfo.country ? accountInfo.country: ""}
                            /> */}
                        <CountryDropdown
                            value={user.country}
                            onChange={(val) => selectCountry(val)}
                            classes={style.custom_form_control_selected}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-6">
                        <RegionDropdown
                            country={user.country}
                            value={user.city}
                            onChange={(val) => selectCity(val)}


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
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="row">

                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="State"
                            className={style.custom_form_control}
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Postal code"
                            className={style.custom_form_control}
                            name="postal_code"
                            value={user.postal_code}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">

                    <div className="col-6">
                        <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            className={style.custom_form_control}
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-dark mb-4" onClick={handleClick}>Save Changes</button>

        </div>
        // </div >
    );
}