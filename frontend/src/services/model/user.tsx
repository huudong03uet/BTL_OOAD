import User from "@/models/user";
import SellerDataService from "./seller";

export default class UserDataService {
    private static userData: User | null = null;

    constructor() {
        if (typeof localStorage !== 'undefined') {
            const data_user = window.localStorage.getItem('dataUser');
            if (typeof data_user === 'string') {
                UserDataService.userData = JSON.parse(data_user);
            }
        }
    }
    

    static setUserData(data: User | null) {
        window.localStorage.setItem('dataUser', JSON.stringify(data));
        UserDataService.userData = data;
    }

    static removeUserData() {
        window.localStorage.removeItem('dataUser');
        SellerDataService.removeSellerData()
        UserDataService.userData = null;
    }

    static getUserData(): User | null {
        const data_user = localStorage.getItem('dataUser');

        if (typeof data_user === 'string') {
            UserDataService.userData = JSON.parse(data_user);
        }

        return UserDataService.userData;
    }
}
