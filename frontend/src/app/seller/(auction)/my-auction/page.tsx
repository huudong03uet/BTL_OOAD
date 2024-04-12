'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import UserDataService from "@/services/model/user";
import { seller_add_product } from "@/services/product/seller";

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from "next/link";
import Auction from "@/models/auction";
import { seller_auction_not_sold_service } from "@/services/auction/seller";
import MyAuctionTable, { TableActivity } from "../../component/auction-table";


//  cứ lấy hết thông tin có của auction -> không cần lọc, dư sẽ để vào phần detail hoặc bỏ


export default function MyAuction() {
    const [data, setData] = useState<Auction[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_auction_not_sold_service();
                setData(data);
            } catch (error) {
                console.error('Error fetching upcoming online auctions:', error);
            }
        };

        fetchData()
    }, [])


    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                My Auction
            </div>
            <div className={style.div_section}>
            <MyAuctionTable activity={TableActivity.MY_AUCTION} data={data}/>

            </div>


        </div >
    );
}


