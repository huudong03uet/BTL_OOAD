"use client"
import axios from 'axios';

import User from '@/models/user';
import { HOST } from '@/services/host';

const TOKEN_KEY = 'ooad-app-token'; // Choose a unique key


const user_login_service = async (
    password: string,
    user_name: string,
) => {
    try {
        let url = `${HOST}/auth/user/login`;
        let body = {user_name: user_name, password: password}
        const response = await axios.post(url, body);
        let user: User = {
            id: response.data.account.id,
            email: response.data.account.email,
            first_name: response.data.account.first_name,
            last_name: response.data.account.last_name,
            user_name: response.data.account.user_name,
            coin: response.data.account.coin,
            phone: response.data.account.phone,
            location_id: response.data.account.location_id,
            avatar_path: response.data.account.avatar_path,
        }
        const token = response.data.token
        localStorage.setItem(TOKEN_KEY, token);
        return {ok: true, user, error: null};
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return {ok: false, error, user: null};
    }
};

const admin_login_service = async (
    password: string,
    admin_name: string,
) => {
    try {
        let url = `${HOST}/auth/admin/login`;
        let body = {admin_name: admin_name, password: password}
        const response = await axios.post(url, body);

        let user: User = {
            id: response.data.id,
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            user_name: response.data.user_name,
            coin: response.data.coin,
            phone: response.data.phone,
            location_id: response.data.location_id,
            avatar_path: response.data.avatar_path,
        }

        return {ok: true, user, error: null};
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return {ok: false, error, user: null};
    }
};

const loginFromToken = async (): Promise<User | null> => {
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

        const userData = response.data;

        if (!userData) {
            console.error("No user data received from server.");
            return null;
        }

        const user: User = {
            id: userData.id,
            email: userData.email,
            first_name: userData.first_name,
            last_name: userData.last_name,
            user_name: userData.user_name,
            coin: userData.coin,
            phone: userData.phone,
            location_id: userData.location_id,
            avatar_path: userData.avatar_path,
        };
        console.log(user);
        return user;
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};


export { user_login_service, admin_login_service, loginFromToken, logout};
