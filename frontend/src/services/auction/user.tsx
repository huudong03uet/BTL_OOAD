"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '@/services/model/user';

let user_get_auction_upcoming = async () => {
    try {
        let url = `${HOST}/auction/user/upcomming/user_id=${UserDataService.getUserData()?.user_id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export { user_get_auction_upcoming };