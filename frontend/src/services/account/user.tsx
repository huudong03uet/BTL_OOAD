"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import User from '@/models/user';
import Location from '@/models/location';

const user_change_password_service = async (user_id: any, old_password: string, new_password: string) => {
    try {
        let url = `${HOST}/account/user/change-password`;
        let body = {
            user_id: user_id,
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

const user_edit_account_service = async (user: User, location: Location) => {
    try {
        let url = `${HOST}/account/user/edit-profile`;
        let body = {
            user: user,
            location: location,
        }
        const response = await axios.put(url, body);

        let user_edit: User = {
            id: response.data.id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_name: response.data.user_name,
            coin: response.data.coin,
            phone: response.data.phone,
            location_id: response.data.location_id,
        }

        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data.message;
    }
};

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

export { user_change_password_service, user_edit_account_service, user_forgot_password_service };
