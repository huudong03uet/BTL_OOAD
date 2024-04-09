"use client"
import axios from 'axios';

import { HOST } from '@/services/host';

const get_artist_recommend_service = async () => {
    try {
        let url = `${HOST}/artist/recommend`;
        let response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export default get_artist_recommend_service;
