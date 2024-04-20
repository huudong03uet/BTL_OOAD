"use client"
import axios from 'axios';

import { HOST } from './host';

let location_analist = async () => {
    try {
        let url = `${HOST}/location/analist`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let get_total_analyst = async () => {
    try {
        let url = `${HOST}/analyst/total`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


let get_filter_analyst = async () => {
    try {
        let url = `${HOST}/analyst/filter`;
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching data:', error);
        return error.response.data;
    }
}


export { 
    location_analist,
    get_filter_analyst,
    get_total_analyst
} ;