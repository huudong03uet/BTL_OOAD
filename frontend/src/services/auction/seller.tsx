"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const seller_auction_create_service = async (auctionData: any) => {
    try {
        let url = `${HOST}/auction/seller/create`;
        let response = await axios.post(url, auctionData);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

const seller_auction_past_service = async (seller_id: number) => {
    try {
        let url = `${HOST}/auction/seller/past/seller_id=${seller_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

const seller_auction_show_product = async (auction_id: number|null, id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/auction/seller/show-product/seller_id=${id}`;
            if(auction_id == null) {
                url+="/auction_id=null"
            } else {
                url+=`/auction_id=${auction_id}`
            }
            console.log(url)
            let response = await axios.get(url);
            return response.data;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

const seller_auction_history_service = async (id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/auction/seller/history/seller_id=${id}`;
            let response = await axios.get(url);
            return response.data;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


const seller_auction_not_sold_service = async (id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/auction/seller/not-sold/seller_id=${id}`;
            let response = await axios.get(url);
            return response.data;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_get_auction_info = async (auction_id: number, id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/auction/seller/info/seller_id=${id}/auction_id=${auction_id}`;
            let response = await axios.get(url);
            return response.data;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let seller_update_auction = async (auctionData: any) => {
    try {
        let url = `${HOST}/auction/seller/update`;
        let response = await axios.post(url, auctionData);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { 
    seller_auction_create_service, 
    seller_auction_past_service,
    seller_auction_show_product,
    seller_auction_history_service,
    seller_auction_not_sold_service,
    seller_get_auction_info,
    seller_update_auction
};
