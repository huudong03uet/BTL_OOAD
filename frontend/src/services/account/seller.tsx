"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import Seller from '@/models/seller';
import Location from '@/models/location';



let seller_register = async (user_id: any, seller_info: any, card_info: any, location_info: any) => {
    try {
        let url = `${HOST}/account/seller/register`;
        let body = {
            user_id: user_id,
            card_info: card_info,
            seller_info: seller_info,
            location_info: location_info,
        }
        const response = await axios.post(url, body);
        return response;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response;
    }
}

let seller_info = async (seller_id: number) => {
    try {
        let url = `${HOST}/account/seller/info/seller_id=${seller_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let  get_seller_by_user = async (id: any) =>  {
    try {
        let url = `${HOST}/account/seller/user_id=${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_edit_profile = async (seller: Seller| null, location: Location) => {
    if(seller) {
        try {
            let url = `${HOST}/account/seller/edit-profile`;
            let body = {
                "seller": seller,
                "location": location,
            }
            const response = await axios.put(url, body);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching data:', error);
            return error.response.data;
        }    
    }
}


let seller_inviter_user = async () => {
    try {
        let url = `${HOST}/account/admin/user-manager`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { seller_register, seller_info, seller_inviter_user, seller_edit_profile, get_seller_by_user } ;
