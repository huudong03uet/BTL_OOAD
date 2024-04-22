"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import Product from '@/models/product';
import Category from '@/models/category';


let seller_add_product = async (formData: FormData) => {
    try {
        let url = `${HOST}/product/seller/create`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_product_sold_service = async (seller_id: number) => {
    try {
        let url = `${HOST}/product/seller/sold/seller_id=${seller_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_update_product = async (product: Product, category: Category[], id: any) => {
    try {
        let url = `${HOST}/product/seller/update`;
        const body: any = {};
        for (const [key, value] of Object.entries(product)) {
            body[key] = value;
        }
        body["categories"] = category

        if (id !== null) {
            body["seller_id"] = id;

            const response = await axios.post(url, body);
            return;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_get_all_products = async (id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/product/seller/all/seller_id=${id}`;
            let response = await axios.get(url);
            return response.data;
        }

        return null
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let seller_get_product_history = async (id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/product/seller/history/seller_id=${id}`;
            let response = await axios.get(url);
            return response.data;
        }

        return null
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_notify = async (id: any) => {
    try {
        if (id !== null) {
            let url = `${HOST}/product/seller/notify/seller_id=${id}`;
            let response = await axios.get(url);
            return response.data;
        }

        return null
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export {
    seller_add_product,
    seller_product_sold_service,
    seller_update_product,
    seller_get_all_products,
    seller_get_product_history,
    seller_notify
};
