"use client"
import axios from 'axios';
import { HOST } from '@/services/host';

const sign_up_service = async (
    password: string,
    username: string,
    email: string
) => {
    try {
        let url = `${HOST}/auth/sign_up`;
        let body = {password: password, username: username, email: email}
        const response = await axios.post(url, body);
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default sign_up_service;
