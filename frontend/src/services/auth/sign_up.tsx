"use client"
import axios from 'axios';
import { HOST } from '@/services/host';

const user_sign_up_service = async (
    first_name: string,
    last_name: string,
    password: string,
    user_name: string,
    email: string,
) => {
    try {
        let url = `${HOST}/auth/user/sign_up`;
        let body = {password: password, user_name: user_name, email: email, first_name: first_name, last_name: last_name}
        const response = await axios.post(url, body);
        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error.response.data);
        return error.response.data;
    }
};

const admin_sign_up_service = async (
    first_name: string,
    last_name: string,
    password: string,
    admin_name: string,
    email: string,
) => {
    try {
        let url = `${HOST}/auth/admin/sign_up`;
        let body = {password: password, admin_name: admin_name, email: email, first_name: first_name, last_name: last_name}
        const response = await axios.post(url, body);
        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error.response.data);
        return error.response.data;
    }
};

export { user_sign_up_service, admin_sign_up_service };
