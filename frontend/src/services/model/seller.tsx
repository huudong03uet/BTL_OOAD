import Seller from "@/models/seller";
import { HOST } from "../host";
import axios from "axios";

export default class SellerDataService {
    private static sellerData: Seller | null = null;

    static async setSellerData(data: Seller | null) {
        window.localStorage.setItem('dataSeller', JSON.stringify(data));
        SellerDataService.sellerData = data;
    }

    static removeSellerData() {
        window.localStorage.removeItem('dataSeller');
        SellerDataService.sellerData = null;
    }

    static async getSellerData(id: any): Promise<Seller | null> {
        const data_seller = window.localStorage.getItem('dataSeller');

        if (typeof data_seller === 'string') {
            SellerDataService.sellerData = JSON.parse(data_seller);
            if (SellerDataService.sellerData?.id == null) {
                return SellerDataService.fetchSellerData(id);
            }
            return SellerDataService.sellerData;
        } else {
            return SellerDataService.fetchSellerData(id);
        }
    }

    private static async fetchSellerData(id: any): Promise<Seller | null> {
        try {
            const data = await SellerDataService._get_seller_by_user(id);
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

    private static async _get_seller_by_user(id: any) {
        try {
            let url = `${HOST}/account/seller/user_id=${id}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching data:', error);
            return error.response.data;
        }
    }
}

