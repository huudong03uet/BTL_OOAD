import Seller from "@/models/seller";
import { HOST } from "../host";
import UserDataService from "./user";
import axios from "axios";

export default class SellerDataService {
    private static sellerData: Seller | null = null;

    static async setSellerData(data: Seller | null) {
        window.localStorage.setItem('dataSeller', JSON.stringify(data));
        SellerDataService.sellerData = data;
    }

    static removeUserData() {
        window.localStorage.removeItem('dataSeller');
        SellerDataService.sellerData = null;
    }

    static async getSellerData(): Promise<Seller | null> {
        const data_seller = window.localStorage.getItem('dataSeller');

        if (typeof data_seller === 'string') {
            SellerDataService.sellerData = JSON.parse(data_seller);
            if (SellerDataService.sellerData?.id == null) {
                return SellerDataService.fetchSellerData();
            }
            return SellerDataService.sellerData;
        } else {
            return SellerDataService.fetchSellerData();
        }
    }

    private static async fetchSellerData(): Promise<Seller | null> {
        try {
            const data = await SellerDataService._get_seller_by_user();
            if (data) {
                SellerDataService.setSellerData(data);
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching seller data:', error);
            return null;
        }
    }

    private static async _get_seller_by_user() {
        try {
            let url = `${HOST}/account/seller/user_id=${UserDataService.getUserData()?.user_id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching data:', error);
            return error.response.data;
        }
    }
}

