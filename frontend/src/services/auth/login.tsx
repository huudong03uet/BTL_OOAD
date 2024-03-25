"use client"
import axios from 'axios';

import User from '@/models/user';
import UserDataService from '../model/user';
import { HOST } from '@/services/host';

const login_service = async (
    password: string,
    username: string,
) => {
    try {
        let url = `${HOST}/auth/login`;
        let body = {username: username, password: password}
        const response = await axios.post(url, body);

        let user: User = {
            user_id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            evaluate: response.data.evaluate,
            coin: response.data.coin,
            phone: response.data.phone,
            country: response.data.country,
            address: response.data.address,
            city: response.data.city,
            state: response.data.state,
            postal_code: response.data.postal_code,
        }
        UserDataService.setUserData(user);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data.message;
    }
};

export default login_service;
