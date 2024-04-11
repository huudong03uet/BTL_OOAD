'use client'
import { Form, } from "react-bootstrap";
import style from '../../../my-account/style.module.css'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import MyProductTable, { TableActivity } from '../../component/product-table';



export default function ProductHistory() {



    return (
        <div className='row mx-5'>

            <div className={style.div_title}>
                My Product
            </div>
            <div className={style.div_section}>
                <MyProductTable activity={TableActivity.VIEW_MY_PRODUCT}></MyProductTable>
            </div>


        </div >
    );
}

