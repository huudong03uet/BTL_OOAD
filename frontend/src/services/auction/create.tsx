"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import Auction from '@/models/auction';

const auction_create_service = async (auctionData: Auction) => {
    try {
        let url = `${HOST}/auction/create`;
        let response = await axios.post(url, auctionData);
        console.log(response.data)
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default auction_create_service;
