import User from "@/models/user";

export default class UserDataService {
    private static userData: User | null = null;

    constructor() {
        const data_user = localStorage.getItem('dataUser');

        if (typeof data_user === 'string') {
            UserDataService.userData = JSON.parse(data_user);
        }
    }

    static setUserData(data: User | null) {
        window.localStorage.setItem('dataUser', JSON.stringify(data));
        UserDataService.userData = data;
    }

    static getUserData(): User | null {
        const data_user = localStorage.getItem('dataUser');

        if (typeof data_user === 'string') {
            UserDataService.userData = JSON.parse(data_user);
        }

        return UserDataService.userData;
    }
}
