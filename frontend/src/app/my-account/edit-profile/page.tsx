'use client'
import { Form, } from "react-bootstrap";
import style from '../style.module.css';
import React, { useState, useEffect, ChangeEvent, useContext } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import User from "@/models/user";
import Location from "@/models/location";
import get_location_service from "@/services/component/location";
import { user_change_password_service, user_edit_account_service } from "@/services/account/user";
import { UserContext } from "@/services/context/UserContext";


export default function EditProfile() {
    let {user, setUser} = useContext(UserContext)
    const [location, setLocation] = useState<Location>({} as Location)
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [updateEmail, setUpdateEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            if (user && user.position_id) {
                const locationData = await get_location_service(user.location_id);
                if (locationData) {
                    setLocation(prevLocation => ({
                        ...prevLocation,
                        country: locationData.country,
                        address: locationData.address,
                        city: locationData.city,
                        state: locationData.state,
                        postal_code: locationData.postal_code,
                        x: locationData.x,
                        y: locationData.y,
                    }));
                }
            }
        };

        fetchData();
    }, []);

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'old_password') {
            setOldPassword(value);
        } else if (name === 'new_password') {
            setNewPassword(value);
        } else if (name === 'confirm_password') {
            setConfirmPassword(value);
        }
    };

    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(({
            ...user,
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
        // console.log(user)
        const data = await user_edit_account_service(user, location);
        let user_edit: User = {
            id: data.id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            user_name: data.user_name,
            coin: data.coin,
            phone: data.phone,
            location_id: data.location_id,
        }
        setUser(user_edit);
        setUpdateEmail(false)
    }


    const handleClickChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            // Handle password mismatch
            return;
        }
        try {
            await user_change_password_service(user.id, oldPassword, newPassword);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setChangePassword(false)
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div className='row mx-0'>
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
                            name="first_name"
                            value={user.first_name}
                            onChange={handleChangeUser}
                        />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            className={style.custom_form_control}
                            name="last_name"
                            value={user.last_name}
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
                                    name="email"
                                    value={user.email}
                                    onChange={handleChangeUser}
                                />
                                <div className='d-flex align-items-center'>
                                    <button type="button" onClick={() => handleClick()} className="btn btn-danger">Update</button>
                                    <a onClick={() => setUpdateEmail(false)} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0" style={{ cursor: "pointer" }}>
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="col-6">
                                <Form.Control
                                    type="text"
                                    defaultValue={user.email}
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
                                    type="password"
                                    placeholder="Current Password"
                                    name="old_password"
                                    value={oldPassword}
                                    onChange={handleChangePassword}
                                    className={style.custom_form_control}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="New Password"
                                    name="new_password"
                                    value={newPassword}
                                    onChange={handleChangePassword}
                                    className={style.custom_form_control}
                                />
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm New Password"
                                    name="confirm_password"
                                    value={confirmPassword}
                                    onChange={handleChangePassword}
                                    className={style.custom_form_control}
                                />
                                <div className='d-flex align-items-center'>
                                    <button type="button" className="btn btn-danger" onClick={handleClickChangePassword}>Update</button>
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
                            value={user.phone}
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