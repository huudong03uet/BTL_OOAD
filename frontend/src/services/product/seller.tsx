"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';
import ProductDetail from '@/models/product_detail';
import SellerDataService from '../model/seller';


let seller_add_product = async (formData: FormData) => {
    try {
        let url = `${HOST}/product/seller/create`;
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

let seller_product_sold_service = async () => {
    try {
        let url = `${HOST}/product/seller/sold/user_id=${UserDataService.getUserData()?.user_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let seller_update_product = async (product: ProductDetail, category: string) => {
    try {
        let url = `${HOST}/product/seller/update`;
        const body: any = {};
        for (const [key, value] of Object.entries(product)) {
            body[key] = value;
        }
        body["category_name"] = category

        const sellerData = await SellerDataService.getSellerData();
        if (sellerData !== null) {
            body["seller_id"] = sellerData.id;

            const response = await axios.post(url, body);
            return;
        }
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { seller_add_product, seller_product_sold_service, seller_update_product } ;
