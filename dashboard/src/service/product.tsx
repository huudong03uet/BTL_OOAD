"use client"
import axios from 'axios';

import { HOST } from './host';
import AdminDataService from './admin_service';

let product_not_insepct = async () => {
    try {
        let url = `${HOST}/product/admin/not-inspect`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let product_insepect = async (description: string, product_id: number, status: string) => {
    try {
        let url = `${HOST}/product/admin/inspect`;
        let body = {
            "description": description,
            "product_id": product_id,
            "admin_id": AdminDataService.getAdminData()?.id,
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

let product_all = async () => {
    try {
        let url = `${HOST}/product/admin/all`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let category_all = async () => {
    try {
        let url = `${HOST}/product/user/all-category`

        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let category_create = async (formData: FormData) => {
    try {
        let url = `${HOST}/product/admin/category/create`;
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

let product_delete = async (product_id: number) => {
    try {
        let url = `${HOST}/product/admin/product_id=${product_id}`

        const response = await axios.delete(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export {
    product_not_insepct,
    product_insepect,
    product_all,
    category_all,
    category_create,
    product_delete
};
