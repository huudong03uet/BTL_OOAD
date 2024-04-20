'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent, useContext } from 'react';

import MyProductTable, { TableActivity } from '../../component/product-table';
import Product from "@/models/product";
import { seller_get_product_history } from "@/services/product/seller";
import { SellerContext } from "@/services/context/SellerContext";



export default function ProductHistory() {
    const {seller} = useContext(SellerContext);

    const [data, setData] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await seller_get_product_history(seller?.id);
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

