"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';


let seller_add_product = async (formData: FormData) => {
    try {
        let url = `${HOST}/product/seller/create`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


const seller_product_sold_service = async () => {
    try {
        let url = `${HOST}/product/seller/sold/user_id=${UserDataService.getUserData()?.user_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { seller_add_product, seller_product_sold_service } ;
