'use client'
import { Form, } from "react-bootstrap";
import style from '../style.module.css';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import User from "@/models/user";
import UserDataService from "@/services/model/user";
import edit_account_service from "@/services/my_account/edit_account";
import Location from "@/models/location";
import get_location_service from "@/services/my_account/get_location";


export default function EditProfile() {
    const initialUserData = UserDataService.getUserData() || {} as User;
    const [user, setUser] = useState<User>(initialUserData);
    const initialLocation = {} as Location;
    const [location, setLocation] = useState<Location>(initialLocation)

    useEffect(() => {
        const userData = UserDataService.getUserData();
        if (userData) {
            setUser(prevUser => ({
                ...prevUser,
                email: userData.email,
                phone: userData.phone,
                first_name: userData.first_name,
                last_name: userData.last_name,
                location_id: userData.location_id,
            }));
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const userData = UserDataService.getUserData();
            if (userData && userData.location_id) {
                const locationData = await get_location_service(userData.location_id);
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

    const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
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
        await edit_account_service(user, location);
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
                            value={user.first_name}
                            onChange={handleChangeUser}
                        />
                    </div>
                    <div className="col-3">
                        <Form.Control
                            type="text"
                            placeholder="Last name"
                            className={style.custom_form_control}
                            name="firstName"
                            value={user.last_name}
                            onChange={handleChangeUser}
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
            <button type="button" className="btn btn-dark mb-4" onClick={handleClick}>Save Changes</button>

        </div>
        // </div >
    );
}