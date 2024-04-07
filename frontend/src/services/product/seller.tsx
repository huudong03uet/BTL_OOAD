"use client"
import axios from 'axios';

import { HOST } from '@/services/host';


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

export { seller_add_product } ;
