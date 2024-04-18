"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '@/services/model/user';

let get_auction_upcoming = async () => {
    try {
        let url = `${HOST}/user/auction/upcomming/user_id=${UserDataService.getUserData()?.id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let get_category_service = async () => {
    try {
        let url = `${HOST}/user/all-category`

        const response = await axios.get(url);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { get_category_service, get_auction_upcoming };

