'use client'
import { Form, Modal, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent } from 'react';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MyProductTable, { TableActivity } from "@/app/seller/component/product-table";
import { seller_auction_create_service, seller_auction_show_product } from "@/services/auction/seller";
import Location from "@/models/location";
import SellerDataService from "@/services/model/seller";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Product from "@/models/product";

enum AuctionVisibility {
    PUBLIC = 0,
    PRIVATE = 1,
}



export default function AddAuction() {
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [data, setData] = useState<Product[]>([])
    const [auctionStates, setAuctionStates] = useState<boolean[]>([]);
    const [timeStartValue, setTimeStartValue] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [dateStartValue, setDateStartValue] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
    const [visibility, setVisibility] = useState(AuctionVisibility.PUBLIC);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [conditionCoin, setConditionCoin] = useState('');
    const [location, setLocation] = useState<Location>({} as Location)
    

    const handleChange = (event: SelectChangeEvent) => {
        setVisibility(event.target.value as unknown as AuctionVisibility);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_auction_show_product(null);
                setData(data);
                setAuctionStates(Array(data.length).fill(false));
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name == 'conditionCoin') {
            setConditionCoin(value)
        }
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

    const handleCreateAuction = async () => {
        let products: number[] = [];
        data.forEach((product, index) => {
            if (auctionStates[index]) {
                products.push(product.id)
            }
        });

        let seller_data = await SellerDataService.getSellerData()

        let auction_data = {
            "name": name,
            "condition_coin": conditionCoin,
            "description": description,
            "time_auction": timeStartValue?.format("YYYY-MM-DD HH:mm"),
            "location": location,
            "seller_id": seller_data?.id,
            "status": visibility === AuctionVisibility.PUBLIC ? "public" : "private",
            "products": products
        }

        await seller_auction_create_service(auction_data)
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

                    <div className="col-12">
                        <Form.Label>Auction name<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Auction name"
                            className={style.custom_form_control}
                            value={name}
                            name="name"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Form.Label>Description<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Description"
                            className={style.custom_form_control}
                            value={description}
                            name="description"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-3">
                        <Form.Label>Condition Coin<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Condition Coin"
                            className={style.custom_form_control}
                            value={conditionCoin}
                            name="conditionCoin"
                            onChange={handleInputChange}
                            required
                        />
                    </div>


                    <div className="col-3">
                        <Form.Label>Date start<span style={{ color: 'red' }}>*</span></Form.Label>
                        <div className='w-100'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DesktopDatePicker 
                                    value={dateStartValue}
                                    onChange={(newValue) => setDateStartValue(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className="col-3">
                        <Form.Label>Time start<span style={{ color: 'red' }}>*</span></Form.Label>
                        <div className='w-100'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <TimePicker
                                    value={timeStartValue}
                                    onChange={(newValue) => setTimeStartValue(newValue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div className='col-3'>
                        <Form.Label>Visibility<span style={{ color: 'red' }}>*</span></Form.Label>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={visibility.toString()}
                                onChange={handleChange}
                            >
                                <MenuItem value={AuctionVisibility.PUBLIC}>Public</MenuItem>
                                <MenuItem value={AuctionVisibility.PRIVATE}>Private</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        {/* <Form.Control
                                type="text"
                                placeholder="Selected Country"
                                className={style.custom_form_control}
                                defaultValue={accountInfo.country ? accountInfo.country: ""}
                            /> */}
                        <Form.Label>Location<span style={{ color: 'red' }}>*</span></Form.Label>
                        <CountryDropdown
                            value={location.country}
                            onChange={(val) => selectCountry(val)}
                            classes={style.custom_form_control_selected}
                        />
                    </div>

                    <div className="col-6">
                        <Form.Label>City<span style={{ color: 'red' }}>*</span></Form.Label>
                        <RegionDropdown
                            country={location.country}
                            value={location.city}
                            onChange={(val) => selectCity(val)}


                            classes={style.custom_form_control_selected}
                        />
                    </div>

                </div>

                <div className="row">
                    <div className="col-6">
                        <Form.Label>Address<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            className={style.custom_form_control}
                            name="address"
                            value={location.address}
                            onChange={handleChangeLocation}
                            required
                        />
                    </div>

                    <div className="col-6">
                        <Form.Label>State<span style={{ color: 'red' }}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="State"
                            className={style.custom_form_control}
                            name="state"
                            value={location.state}
                            onChange={handleChangeLocation}
                            required
                        />
                    </div>
                </div>

            </div>

            <div className={style.div_section}>
                <div className='d-flex justify-content-center'>
                    <button type="button" className="btn btn-dark mx-1 px-3" onClick={() => setShowNotificationModal(true)}
                    >Add Product</button>
                    </div>
            </div>

            <div>
                <button type="submit" className="btn btn-dark mb-4 col-2" onClick={handleCreateAuction}>
                    Create Auction
                </button>
            </div>

            <Modal size="xl" show={showNotificationModal} onHide={() => setShowNotificationModal(false)}>
                <Modal.Header >
                    <Modal.Title style={{ width: '100%' }}>
                        Add Product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MyProductTable activity={TableActivity.ADD_TO_AUCTION} data={data} auctionStates={auctionStates} setAuctionStates={setAuctionStates}></MyProductTable>
                </Modal.Body>
            </Modal>

        </div >
    );
}