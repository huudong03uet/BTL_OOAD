"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from './model/user';


let get_notification = async () => {
    try {
        let url = `${HOST}/notification/role_id=${UserDataService.getUserData()?.user_id}/role_type=user`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export default get_notification;
