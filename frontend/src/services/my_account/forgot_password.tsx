"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const forgot_password_service = async (email: string) => {
    try {
        let url = `${HOST}/my-account/forgot-password`;
        await axios.post(url, {email: email});
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default forgot_password_service;
