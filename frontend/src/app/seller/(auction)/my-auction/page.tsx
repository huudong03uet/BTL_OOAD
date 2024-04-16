'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';


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


