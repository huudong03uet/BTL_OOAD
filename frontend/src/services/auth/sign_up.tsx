"use client"
import axios from 'axios';
import { HOST } from '@/services/host';

const sign_up_service = async (
    first_name: string,
    last_name: string,
    password: string,
    user_name: string,
    email: string,
) => {
    try {
        let url = `${HOST}/auth/sign_up`;
        let body = {password: password, user_name: user_name, email: email, first_name: first_name, last_name: last_name}
        const response = await axios.post(url, body);
        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error.response.data);
        return error.response.data;
    }
};

export default sign_up_service;
