"use client"
import axios from 'axios';

import UserDataService from '../model/user';
import { HOST } from '@/services/host';

const change_password_service = async (old_password: number, new_password: number) => {
    try {
        let url = `${HOST}/my-account/change-password`;
        let body = {
            user_id: UserDataService.getUserData()?.user_id,
            old_password: old_password,
            new_password: new_password,
        }
        await axios.post(url, body);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default change_password_service;
