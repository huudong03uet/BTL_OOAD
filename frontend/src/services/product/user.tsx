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

export { user_get_category_service, } ;
