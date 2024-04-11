'use client'
import { Form, Modal, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserDataService from "@/services/model/user";
import { seller_add_product } from "@/services/product/seller";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MyProductTable, { TableActivity } from "@/app/seller/(product)/my-products/product-table-component";

enum AuctionVisibility {
    PUBLIC = 0,
    PRIVATE = 1,
}



export default function AddAuction() {
    const [showNotificationModal, setShowNotificationModal] = useState(false);

    const [dateValue, setDateValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [timeStartValue, setTimeStartValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [timeEndValue, setTimeEndValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [visibility, setVisibility] = React.useState(AuctionVisibility.PUBLIC);

    const handleChange = (event: SelectChangeEvent) => {
        setVisibility(event.target.value as unknown as AuctionVisibility);
    };
    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                Add auction
            </div>
            <div className={style.div_section}>
                <div className={style.div_header}>
                    Auction Information
                </div>
                <div className="row">
                    <div className="col-6">
                        <Form.Label>Auction name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Auction name"
                            className={style.custom_form_control}
                        />
                    </div>
                    <div className="col-6">
                        <Form.Label>Artist</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Artist"
                            className={style.custom_form_control}
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
                        />
                    </div>
                </div>

                <div className="row mb-3">



                    <div className="col-3">
                        <Form.Label>Date organization</Form.Label>
                        <div className='w-100'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker
                                    value={dateValue}
                                    onChange={(newValue) => setDateValue(newValue)}
                                />
                            </LocalizationProvider>
                        </div>

                    </div>
                    <div className="col-3">
                        <Form.Label>Time start</Form.Label>
                        <div className='w-100'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <TimePicker
                                    value={timeStartValue}
                                    onChange={(newValue) => setTimeStartValue(newValue)}
                                />
                            </LocalizationProvider>

                        </div>
                    </div>

                    <div className="col-3">
                        <Form.Label>Time end (Estimate)</Form.Label>
                        <div className='w-100'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <TimePicker
                                    value={timeEndValue}
                                    onChange={(newValue) => setTimeEndValue(newValue)}
                                />
                            </LocalizationProvider>

                        </div>
                    </div>

                    <div className='col-3'>
                        <Form.Label>Visibility </Form.Label>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={visibility.toString()} // Convert visibility to string
                                onChange={handleChange}
                            >
                                <MenuItem value={AuctionVisibility.PUBLIC}>Public</MenuItem>
                                <MenuItem value={AuctionVisibility.PRIVATE}>Private</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            className={style.custom_form_control}
                        />
                    </div>
                </div>

            </div>

            <div className={style.div_section}>
                {/* <div className={style.div_header}>
                    Product Information
                </div> */}
                {/* <div className="row">
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


                </div> */}
                {/* <div>
                    <MyProductTable activity={TableActivity.VIEW_IN_AUCTION}></MyProductTable>
                </div> */}
                {/*  button add product -> show modal add product */}
                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-dark mx-1 px-3" onClick={() => setShowNotificationModal(true)}
                    >Add Product</button>
                    </div>
            </div>

            <div>
                <button type="submit" className="btn btn-dark mb-4 col-2" >Create Auction</button>

            </div>

            <Modal size="xl" show={showNotificationModal} onHide={() => setShowNotificationModal(false)}>
                <Modal.Header >
                    <Modal.Title style={{ width: '100%' }}>
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyProductTable activity={TableActivity.ADD_TO_AUCTION}></MyProductTable>
                </Modal.Body>
            </Modal>

        </div >
    );
}