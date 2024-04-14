"use client"
import axios from 'axios';

import { HOST } from './host';

let user_manager = async () => {
    try {
        let url = `${HOST}/account/admin/user-manager`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let seller_manager = async () => {
    try {
        let url = `${HOST}/account/admin/seller-manager`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { 
    user_manager,
    seller_manager
} ;