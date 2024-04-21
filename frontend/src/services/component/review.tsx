"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const get_review_service = async (seller_id: number) => {
    try {
        let url = `${HOST}/review/seller_id=${seller_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};


const set_review_service = async (seller_id: number, user_evaluate: any, star: number, comment:string ) => {
    try {
        let url = `${HOST}/review/create`;
        let body = {
            "seller_id": seller_id,
            "user_evaluate": user_evaluate,
            "star": star,
            "comment": comment,
        }
        console.log(body)
        let response = await axios.post(url, body);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export {
    set_review_service,
    get_review_service
};
