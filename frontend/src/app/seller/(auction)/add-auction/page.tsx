'use client'
import { Modal } from "react-bootstrap";
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
import { Dropdown, DropdownButton, Form, InputGroup, } from "react-bootstrap";
import User from "@/models/user";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from "@mui/material";
import { seller_inviter_user } from "@/services/account/seller";

enum AuctionVisibility {
    PUBLIC = 0,
    PRIVATE = 1,
}


function levenshteinDistance(a: string, b: string): number {
    const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[a.length][b.length];
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
    const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [searchUsers, setSearchUsers] = useState<User[]>([]);
    const [search, setSearch] = useState('');



    const [openModalInvitedUsers, setOpenModalInvitedUser] = React.useState(false);
    const handleOpenModalInvitedUsers = () => setOpenModalInvitedUser(true);
    const handleCloseModalInvitedUsers = () => setOpenModalInvitedUser(false);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_inviter_user();
                setUsers(data);
                setSearchUsers(data)
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
            "products": products,
            "users": invitedUsers
        }

        await seller_auction_create_service(auction_data)
    };



    function removeUserFromListInvited(user: User) {
        setUsers(prevUsers => [
            ...prevUsers,
            user
        ]);
        setSearchUsers(prevUsers => [
            ...prevUsers,
            user
        ]);
        setInvitedUsers(invitedUsers.filter((u) => u.id !== user.id));
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();

            if (search == '') {
                setSearchUsers(users)
                return;
            }

            const searchLower = search.toLowerCase();

            const matchedUsers = users.map((user: User) => {
                const distance = levenshteinDistance(user.user_name.toLowerCase(), searchLower);
                return { ...user, distance };
            });

            const sortedUsers = matchedUsers.sort((a, b) => a.distance - b.distance).slice(0, 5);

            setSearchUsers(sortedUsers);
        }
    };

    const handleSelectSuggestion = (user: User) => {
        setInvitedUsers(prevUsers => [
            ...prevUsers,
            user
        ]);
        setUsers(users.filter((u) => u.id !== user.id));
        setSearchUsers(searchUsers.filter((u) => u.id !== user.id))
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

                <div className='row'>
                    <div className="col-12">
                        <Form.Label>Invite users to bid on your auction</Form.Label>
                        {/* <Form.Control
                                type="text"
                                placeholder="Category"
                                className={style.custom_form_control}
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            /> */}
                        <InputGroup className="mb-3">
                            <Button
                                style={{
                                    backgroundColor: '#000', // Thay đổi màu nền
                                    color: 'white', // Thay đổi màu chữ
                                    border: '0px solid white', // Thêm viền
                                    borderRadius: '4px', // Bo góc
                                }}
                                onClick={handleOpenModalInvitedUsers}>Invite users</Button>
                            <div className="selected-categories">
                                {invitedUsers.map((user) => (
                                    <span
                                        key={user.id}
                                        className="selected-category"
                                        style={{
                                            display: 'inline-block',
                                            padding: '5px 10px',
                                            margin: '5px',
                                            borderRadius: '15px',
                                            backgroundColor: '#f8f9fa',
                                            color: '#333',
                                        }}
                                    >
                                        {user.user_name}
                                        <button
                                            type="button"
                                            onClick={() => removeUserFromListInvited(user)}
                                            style={{
                                                marginLeft: '5px',
                                                color: 'black',
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                borderRadius: '50%',
                                                padding: '2px 5px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {/* Xóa */}
                                            <HighlightOffIcon />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </InputGroup>
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


            {/* modal invited user */}
            <Modal size="xl" show={openModalInvitedUsers} onHide={handleCloseModalInvitedUsers}>
                <Modal.Header>
                    <Modal.Title>Invite users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Search for users</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search for users"
                                className={style.custom_form_control}
                                name="search"
                                value={search}
                                onChange={(e: any) => setSearch(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Users</Form.Label>
                            <div className="col">
                                <div className="col-3">
                                    {searchUsers.map((user) => (
                                        // <div 
                                        //     key={user.id} 
                                        //     onClick={() => handleSelectSuggestion(user)}  // Xử lý sự kiện click
                                        // >
                                        //     {user.user_name} - {user.email}
                                        // </div>

                                        <div>
                                            <div className="d-flex justify-content-center">
                                                <img src={user.avatar_path || "https://via.placeholder.com/150"} alt="user" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <p>{user.user_name}</p>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <Button onClick={() => handleSelectSuggestion(user)}>Invite</Button>
                                            </div>
                                        </div>

                                    ))}
                                    {/* <div className="d-flex justify-content-center">
                                        <img src="https://via.placeholder.com/150" alt="user" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <p>User name</p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Button onClick={() => {
                                            setInvitedUsers([...users, {
                                                id: user_id,
                                                user_name: 'User name'

                                            }]);
                                        }}>Invite</Button>
                                        
                                    </div> */}
                                </div >
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Form.Label>Invited users</Form.Label>
                            <div className="row">
                                {invitedUsers.map((user) => (
                                    <div className="col-3">
                                        <div className="d-flex justify-content-center">
                                            <img src={user.avatar_path || "https://via.placeholder.com/150"} alt="user" className="rounded-circle" style={{ width: '100px', height: '100px' }} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <p>{user.user_name}</p>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <Button onClick={() => removeUserFromListInvited(user)}>Remove</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleCloseModalInvitedUsers}>Close</Button>
                </Modal.Footer>
            </Modal>


        </div >
    );
}