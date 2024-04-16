import Admin from "@/types/admin";

export default class AdminDataService {
    private static adminData: Admin | null = null;

    constructor() {
        const data_Admin = window.localStorage.getItem('dataAdmin');

        if (typeof data_Admin === 'string') {
            AdminDataService.adminData = JSON.parse(data_Admin);
        }
    }

    static setAdminData(data: Admin | null) {
        window.localStorage.setItem('dataAdmin', JSON.stringify(data));
        AdminDataService.adminData = data;
    }

    static removeAdminData() {
        window.localStorage.removeItem('dataAdmin');
        AdminDataService.adminData = null;
    }

    static getAdminData(): Admin | null {
        const data_Admin = window.localStorage.getItem('dataAdmin');

        if (typeof data_Admin === 'string') {
            AdminDataService.adminData = JSON.parse(data_Admin);
        }

        return AdminDataService.adminData;
    }
}
