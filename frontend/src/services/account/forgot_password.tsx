"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const user_forgot_password_service = async (email: string) => {
    try {
        let url = `${HOST}/account/user/forgot-password`;
        await axios.post(url, {email: email});
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export { user_forgot_password_service };
