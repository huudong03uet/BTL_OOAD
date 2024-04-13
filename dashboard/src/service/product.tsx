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

let product_insepect = async (description: string, product_id: number, status: string) => {
    try {
        let url = `${HOST}/product/admin/inspect`;
        let body = {
            "description": description,
            "product_id": product_id,
            "admin_id": 1,
            "status": status
        }
        const response = await axios.post(url, body);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let product_all = async () => {
    try {
        let url = `${HOST}/product/admin/all`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { 
    product_not_insepct,
    product_insepect,
    product_all
} ;
