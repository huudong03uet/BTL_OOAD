"use client";
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { ChangeEvent, useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import style from '../style.module.css';

export default function EditProfile() {

    const [updateEmail, setUpdateEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
    }, []);

    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {

    };

    const handleChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

    };

    const handleClick = async () => {
    }

    return (
        <DefaultLayout>
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
                                onChange={handleChangeUser}
                            />
                        </div>
                        <div className="col-3">
                            <Form.Control
                                type="text"
                                placeholder="Last name"
                                className={style.custom_form_control}
                                name="last_name"
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
                                />
                                <Form.Control
                                    type="text"
                                    placeholder="Password"
                                    className={style.custom_form_control}
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
                                    className={style.custom_form_control}
                                    placeholder="Email"

                                />

                                <a onClick={() => setUpdateEmail(true)} style={{marginLeft: 15, cursor: "pointer"}} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 ">
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
                                    
                                />
                                <a onClick={() => setChangePassword(true)}  style={{marginLeft: 15, cursor: "pointer"}} className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0" >
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
                            {/* Country dropdown */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {/* City dropdown */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Form.Control
                                type="text"
                                placeholder="Address"
                                className={style.custom_form_control}
                                name="address"
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
                                onChange={handleChangeLocation}
                            />
                        </div>
                        <div className="col-3">
                            <Form.Control
                                type="text"
                                placeholder="Postal code"
                                className={style.custom_form_control}
                                name="postal_code"
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
        </DefaultLayout>
    );
}
