"use client"
import axios from 'axios';

import { HOST } from '@/services/host';
import UserDataService from '../model/user';

const get_user_message_service = async () => {
    try {
        let url = `${HOST}/message/all-user/user_id=${UserDataService.getUserData()?.user_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};


const get_message_service = async (user_2_id:number) => {
    try {
        let url = `${HOST}/message/user_id=${UserDataService.getUserData()?.user_id}/user_2_id=${user_2_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

const send_message_service = async (user_2_id: NumberConstructor, content: string) => {
    try {
        let url = `${HOST}/message/send-message`;
        let body = {
            "user_id": UserDataService.getUserData()?.user_id,
            "user_2_id": user_2_id,
            "content": content,
        }
        let response = await axios.post(url, body);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}

export {
    get_message_service,
    get_user_message_service,
    send_message_service
};
