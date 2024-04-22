"use client"
import axios from 'axios';

import { HOST } from './host';

let auction_not_inspect = async () => {
    try {
        let url = `${HOST}/auction/admin/not-inspect`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let auction_inspect = async (description: string, auction_id: number, status: string, admin_id: any) => {
    try {
        let url = `${HOST}/auction/admin/inspect`;
        let body = {
            "description": description,
            "auction_id": auction_id,
            "admin_id": 1,
            "status": status
        }
        console.log(body)
        const response = await axios.post(url, body);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let auction_all = async () => {
    try {
        let url = `${HOST}/auction/admin/all`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let category_all = async () => {
    try {
        let url = `${HOST}/auction/user/all-category`

        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let category_create = async (formData: FormData) => {
    try {
        let url = `${HOST}/auction/admin/category/create`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let auction_delete = async (auction_id: number) => {
    try {
        let url = `${HOST}/auction/admin/auction_id=${auction_id}`

        const response = await axios.delete(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export {
    auction_not_inspect,
    auction_inspect,
    auction_all,
    category_all,
    category_create,
    auction_delete
};
