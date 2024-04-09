"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

let user_get_category_service = async () => {
    try {
        let url = `${HOST}/product/user/all-category`

        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_detail_product = async (product_id: number) => {
    try {
        let url = `${HOST}/product/user/detail/product_id=${product_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { user_get_category_service, user_get_detail_product } ;
