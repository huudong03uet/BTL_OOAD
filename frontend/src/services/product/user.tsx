"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

let user_get_category_service = async () => {
    try {
        let url = `${HOST}/product/user/all-category`

        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_detail_product = async (product_id: number, id: any) => {
    try {
<<<<<<< HEAD
        let url = `${HOST}/product/user/detail/product_id=${product_id}/user_id=${id}`;
=======
        let url = `${HOST}/product/user/detail/product_id=${product_id}/user_id=${UserDataService.getUserData()?.id}`;
>>>>>>> aaf24800ea16138c736493dfbe28d9279b9b65da
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}





let user_get_recently_product = async (id: any) => {
    try {
<<<<<<< HEAD
        let url = `${HOST}/product/user/recently/user_id=${id}`;
=======
        let url = `${HOST}/product/user/recently/user_id=${UserDataService.getUserData()?.id}`;
>>>>>>> aaf24800ea16138c736493dfbe28d9279b9b65da
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let user_get_all_product = async () => {
    try {
        let url = `${HOST}/product/user/all-product`;
        const response = await axios.get(url);
        return response.data;
        
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

let user_get_product_accept = async () => {
    try {
        let url = `${HOST}/product/user/product-accept`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { user_get_category_service, user_get_detail_product, user_get_recently_product, user_get_all_product 

, user_get_product_accept

} ;
