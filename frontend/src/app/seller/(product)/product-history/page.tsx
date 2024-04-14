'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import MyProductTable, { TableActivity } from '../../component/product-table';
import ItemSummary from "@/models/product_summary";
import { seller_get_product_history } from "@/services/product/seller";



export default function ProductHistory() {

    const [data, setData] = useState<ItemSummary[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_get_product_history();
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
                My Product
                
            </div>
            <div className={style.div_section}>
                <MyProductTable activity={TableActivity.VIEW_MY_PRODUCT} data={data}></MyProductTable>
            </div>


        </div >
    );
}

