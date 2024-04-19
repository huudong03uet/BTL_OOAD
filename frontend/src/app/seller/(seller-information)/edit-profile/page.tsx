'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import User from "@/models/user";
import UserDataService from "@/services/model/user";
import Location from "@/models/location";
import get_location_service from "@/services/component/location";
import { user_edit_account_service } from "@/services/account/user";
import SellerDataService from "@/services/model/seller";
import Seller from "@/models/seller";
import { seller_edit_profile } from "@/services/account/seller";


export default function EditProfileSeller() {
    const [seller, setSeller] = useState<Seller>({} as Seller);
    const [location, setLocation] = useState<Location>({} as Location)

    const [updateEmail, setUpdateEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            let userData = await SellerDataService.getSellerData();
            if (userData) {
                setSeller(userData)

                setLocation(userData.location ?? {
                    id: 0,
                    country: '',
                    address: '',
                    city: '',
                    state: '',
                    postal_code: 0,
                    x: '',
                    y: 0,
                });
            }
        };

        fetchData();
    }, []);

    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeller(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocation(prevLocation => ({
            ...prevLocation,
            [name]: value
        }));
    };

    const selectCountry = (val: string) => {
        setLocation(prevLocation => ({
            ...prevLocation,
            country: val
        }));
    };

    const selectCity = (val: string) => {
        setLocation(prevLocation => ({
            ...prevLocation,
            city: val
        }));
    };

    const handleClick = async () => {
        await seller_edit_profile(seller, location);
        SellerDataService.removeSellerData()
        await SellerDataService.getSellerData()
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
                    Shop infor
                </div>
                <div className="row">
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            className={style.custom_form_control}
                            name="name"
                            value={seller.name}
                            onChange={handleChangeUser}
                        />
                    </div>
                </div>
                <div className="row">
                    {
                        updateEmail ? (
                            <div className='col-6'>
                                <Form.Control
                                    type="text"
                                    placeholder="New Email Address"
                                    className={style.custom_form_control}
                                    value={seller.email}
                                    name="email"
                                    onChange={handleChangeUser}
                                />
                                <div className='d-flex align-items-center'>
                                    <button type="button" className="btn btn-danger">Update</button>
                                    <a onClick={() => setUpdateEmail(false)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0" style={{ cursor: "pointer" }}>
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="col-6">
                                <Form.Control
                                    type="text"
                                    defaultValue={seller.email}
                                    className={style.custom_form_control}
                                    disabled
                                />

                                <a onClick={() => setUpdateEmail(true)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 " style={{ cursor: "pointer" }}>
                                    Update Email Address
                                </a>
                            </div>
                        )
                    }

                </div>

                <div className="row">
                    {
                        changePassword ? (
                            <div className='col-6'>
                                <Form.Control
                                    type="text"
                                    placeholder="Current Password"
                                    value=""
                                    className={style.custom_form_control}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="New Password"
                                    className={style.custom_form_control}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Confirm New Password"
                                    className={style.custom_form_control}
                                />
                                <div className='d-flex align-items-center'>
                                    <button type="button" className="btn btn-danger">Update</button>
                                    <a onClick={() => setChangePassword(false)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0" style={{ cursor: "pointer" }}>
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="col-6">
                                <Form.Control type="text"
                                    value={'********'}
                                    className={style.custom_form_control}
                                    disabled
                                />
                                <a onClick={() => setChangePassword(true)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0" style={{ cursor: "pointer" }}>
                                    Change Password
                                </a>
                            </div>
                        )

                    }


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
                            value={location.country}
                            onChange={(val) => selectCountry(val)}
                            classes={style.custom_form_control_selected}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-6">
                        <RegionDropdown
                            country={location.country}
                            value={location.city}
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
                            value={location.address}
                            onChange={handleChangeLocation}
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
                            value={location.state}
                            onChange={handleChangeLocation}
                        />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Postal code"
                            className={style.custom_form_control}
                            name="postal_code"
                            value={location.postal_code}
                            onChange={handleChangeLocation}
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
                            value={seller.phone}
                            onChange={handleChangeUser}
                        />
                    </div>
                </div>
            </div>
            {
                !changePassword && !updateEmail ? (
                    <button type="button" className="btn btn-dark mb-4 col-2" onClick={handleClick}>Save Changes</button>
                ) : (
                    <button type="button" className="btn btn-dark mb-4 col-2" disabled >Save Changes</button>

                )
            }

        </div>
        // </div >
    );
}