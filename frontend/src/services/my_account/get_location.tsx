"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const get_location_service = async (location_id: number) => {
    try {
        let url = `${HOST}/location/id=${location_id}`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default get_location_service;
