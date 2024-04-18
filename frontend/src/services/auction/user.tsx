"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '@/services/model/user';

let user_get_auction_upcoming = async () => {
    try {
        let url = `${HOST}/auction/user/upcomming/user_id=${UserDataService.getUserData()?.user_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let user_get_auction_promote = async () => {
    try {
        let url = `${HOST}/auction/user/promote/user_id=${UserDataService.getUserData()?.user_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_auction_info = async (auction_id: any) => {
    try {
        let url = `${HOST}/auction/user/info/auction_id=${auction_id}/user_id=${UserDataService.getUserData()?.user_id}`;
        console.log(url)
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_product_id_of_auction = async (auction_id: number) => {
    try {
        let url = `${HOST}/auction/user/id-of-auction/auction_id=${auction_id}/user_id=${UserDataService.getUserData()?.user_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_bid_history = async (product_id: number) => {
    try {
        let url = `${HOST}/auction/user/bid-product/product_id=${product_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_add_bid = async (product_id: number, amount: number) => {
    try {
        let url = `${HOST}/auction/user/create-bid`;
        let body = {
            "product_id": product_id,
            "amount": amount,
            "user_id": UserDataService.getUserData()?.user_id,
        }
        const response = await axios.post(url, body);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export {
    user_get_auction_upcoming,
    user_get_auction_promote,
    user_get_auction_info,
    user_get_product_id_of_auction,
    user_get_bid_history,
    user_add_bid
};