"use client"
import axios from 'axios';

import { HOST } from './host';
import AdminDataService from './admin_service';

const login_service = async (
    password: string,
    admin_name: string,
) => {
    try {
        let url = `${HOST}/auth/admin/login`;
        let body = {"admin_name": admin_name, "password": password}
        const response = await axios.post(url, body);

        AdminDataService.setAdminData(response.data.account);
        console.log('response.data:', response.data.account);
        return;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
};

export { 
    login_service,
} ;
