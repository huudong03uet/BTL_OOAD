"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import Auction from '@/models/auction';
import UserDataService from '../model/user';

const seller_auction_create_service = async (auctionData: Auction) => {
    try {
        let url = `${HOST}/auction/seller/create`;
        let response = await axios.post(url, auctionData);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

const seller_auction_past_service = async () => {
    try {
        let url = `${HOST}/auction/seller/past/user_id=${UserDataService.getUserData()?.user_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { seller_auction_create_service, seller_auction_past_service };
