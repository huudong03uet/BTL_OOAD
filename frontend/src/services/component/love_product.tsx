"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';

const check_user_love_product = async (product_id: number) => {
    try {
        let url = `${HOST}/love-product/user_id=${UserDataService.getUserData()?.id}/product_id=${product_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};


const user_love_product = async (product_id: number) => {
    try {
        let url = `${HOST}/love-product/create`;
        let body = {
            "user_id": UserDataService.getUserData()?.id,
            "product_id": product_id
        }
        console.log(body)
        let response = await axios.post(url, body);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


const user_delete_love_product = async (product_id: number) => {
    try {
        let url = `${HOST}/love-product/delete/user_id=${UserDataService.getUserData()?.id}/product_id=${product_id}`;
        let response = await axios.delete(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export {
    check_user_love_product,
    user_love_product,
    user_delete_love_product
};
