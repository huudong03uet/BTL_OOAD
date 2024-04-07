"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import Auction from '@/models/auction';

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

export { seller_auction_create_service };
