"use client"
import axios from 'axios';
import { HOST } from '@/services/host';

const sign_up_service = async (
    firstName: string,
    lastName: string,
    password: string,
    username: string,
    email: string,
) => {
    try {
        let url = `${HOST}/auth/sign_up`;
        let body = {password: password, username: username, email: email, firstName: firstName, lastName: lastName}
        const response = await axios.post(url, body);
        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data.message;
    }
};

export default sign_up_service;
