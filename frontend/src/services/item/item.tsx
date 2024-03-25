"use client"
import axios from 'axios';

import { HOST } from '@/services/host';


let add_item = async (formData: FormData) => {
    try {
        let url = `${HOST}/item/add-item`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.message;
    }
}

export async function get_detail_item(item_id: number) {
    try {
        let url = `${HOST}/item/detail-item/item_id=${item_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.message;
    }
}

export default add_item;
