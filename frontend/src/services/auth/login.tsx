"use client"
import axios from 'axios';
import { HOST } from '@/services/host';

const login_service = async (
    password: string,
    username: string,
) => {
    try {
        let url = `${HOST}/auth/login`;
        let body = {username: username, password: password}
        const response = await axios.post(url, body);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default login_service;
