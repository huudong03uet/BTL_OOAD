"use client"
import axios from 'axios';

import User from '@/models/user';
import UserDataService from '../model/user';
import { HOST } from '@/services/host';
import Location from '@/models/location';

const edit_account_service = async (user: User, location: Location) => {
    try {
        let url = `${HOST}/my-account/edit-profile`;
        let body = {
            user: user,
            location: location,
        }
        const response = await axios.put(url, body);

        let user_edit: User = {
            user_id: response.data.id,
            email: response.data.email,
            first_name: response.data.firstname,
            last_name: response.data.lastName,
            user_name: response.data.username,
            coin: response.data.coin,
            phone: response.data.phone,
            location_id: response.data.location_id,
        }
        UserDataService.setUserData(user_edit);

        return response.data
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data.message;
    }
};

export default edit_account_service;
