"use client"
import axios from 'axios';

import { HOST } from '@/services/host';


let add_item = async (formData: FormData) => {
    try {
        let url = `${HOST}/admin/add-item`;
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export default add_item;
