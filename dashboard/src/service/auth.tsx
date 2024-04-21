"use client"
import axios from 'axios';

import { HOST } from './host';

const TOKEN_KEY = "admin_ooad";


const login_service = async (
    admin_name: string,
    password: string,
) => {
    try {
        let url = `${HOST}/auth/admin/login`;
        let body = {"admin_name": admin_name, "password": password}
        const response = await axios.post(url, body);

        const token = response.data.token
        localStorage.setItem(TOKEN_KEY, token);

        return {data: response.data.account, ok: true};
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return {ok: false, error};
    }
};

const loginFromToken = async () => {
    try {
        const url = `${HOST}/auth/user/getInfoFromToken`;
        const token = localStorage.getItem(TOKEN_KEY);
        console.log(token);
        if (!token) {
            console.error("Token is missing.");
            return null;
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: token,
            },
        });
        

        return {ok: true, data: response.data};
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return {ok: false, error};
    }
};



const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export { 
    login_service,
    loginFromToken,
    logout
};
