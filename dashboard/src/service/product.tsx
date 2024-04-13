"use client"
import axios from 'axios';

import { HOST } from './host';

let product_not_insepct = async () => {
    try {
        let url = `${HOST}/product/admin/not-inspect`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { product_not_insepct } ;
