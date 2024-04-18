"use client"
import axios from 'axios';

import User from '@/models/user';
import UserDataService from '../model/user';
import { HOST } from '@/services/host';

const user_login_service = async (
    password: string,
    user_name: string,
) => {
    try {
        let url = `${HOST}/auth/user/login`;
        let body = {user_name: user_name, password: password}
        const response = await axios.post(url, body);

        let user: User = {
            id: response.data.id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_name: response.data.user_name,
            coin: response.data.coin,
            phone: response.data.phone,
            location_id: response.data.location_id,
        }
        UserDataService.setUserData(user);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

const admin_login_service = async (
    password: string,
    admin_name: string,
) => {
    try {
        let url = `${HOST}/auth/admin/login`;
        let body = {admin_name: admin_name, password: password}
        const response = await axios.post(url, body);

        let user: User = {
            id: response.data.id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_name: response.data.user_name,
            coin: response.data.coin,
            phone: response.data.phone,
            location_id: response.data.location_id,
        }
        UserDataService.setUserData(user);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export { user_login_service, admin_login_service };
