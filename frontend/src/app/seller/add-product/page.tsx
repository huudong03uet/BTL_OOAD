'use client'
import { Form, } from "react-bootstrap";
import style from '../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent } from 'react';
import User from "@/models/user";
import UserDataService from "@/services/model/user";
import edit_account_service from "@/services/my_account/edit_account";
import Location from "@/models/location";
import get_location_service from "@/services/my_account/get_location";


export default function AddProduct() {
    const initialUserData = UserDataService.getUserData() || {} as User;
    const [user, setUser] = useState<User>(initialUserData);
    const initialLocation = {} as Location;
    const [location, setLocation] = useState<Location>(initialLocation)


    const [updateEmail, setUpdateEmail] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


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
        <div className='row mx-5'>

            <div className={style.div_title}>
                Add product
            </div>
            <div className={style.div_section}>
                {/* <div className={style.div_header}>
                    Shop infor
                </div> */}
                <div className="row">
                    <div className="col-6">
                    <Form.Label>Product name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Product name"
                            className={style.custom_form_control}
                            name="firstName"
                        />
                    </div>
                    <div className="col-6">
                    <Form.Label>Artist</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Artist"
                            className={style.custom_form_control}
                            name="firstName"
                        />
                    </div>
                </div>
                <div className="row">

                    <div className="col-12">
                    <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Category"
                            className={style.custom_form_control}
                            name="firstName"
                        />
                    </div>
                </div>
                <div className="row">

                    <div className="col-12">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            className={style.custom_form_control}
                            name="firstName"
                        />
                    </div>
                </div>
                {/* input multi image */}
                <div className="row">
                    <div className="col-12">
                        <Form.Label>Image of products (1 -&gt; 5 images)</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Image"
                            className={style.custom_form_control}
                            name="firstName"
                            multiple
                        />
                    </div>
            </div>


            <div>
                {
                    <button type="button" className="btn btn-dark mb-4 col-2" onClick={handleClick}>Add Product</button>

                }
            </div>


        </div>
         </div >
    );
}