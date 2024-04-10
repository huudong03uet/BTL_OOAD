"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';

const get_review_service = async () => {
    try {
        let url = `${HOST}/review/user_id=${UserDataService.getUserData()?.user_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default get_review_service;
