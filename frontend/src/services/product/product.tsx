"use client"
import axios from 'axios';

import { HOST } from '@/services/host';


let add_product = async (formData: FormData) => {
    try {
        let url = `${HOST}/seller/product/create`;
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

export async function get_detail_product(product_id: number) {
    try {
        let url = `${HOST}/product/detail/id=${product_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export default add_product;
