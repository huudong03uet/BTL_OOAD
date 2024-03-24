"use client"
import axios from 'axios';

import User from '@/models/user';
import UserDataService from '../model/user';
import { HOST } from '@/services/host';

const edit_account_service = async (user: User) => {
    try {
        let url = `${HOST}/my-account/edit-profile`;
        let body = user
        const response = await axios.post(url, body);

        let user_edit: User = {
            user_id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstname,
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
        UserDataService.setUserData(user_edit);

        return response.data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export default edit_account_service;
