import Location from "./location";
interface CardProps {
    id: number;
    name: string;
    expiry: string;
    cvn: string;

}


export type User = {
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    user_name?: string;
    coin?: number,
    phone?: string,
    location_id?: number,
    createdAt?: string,
    card?: CardProps,
    location?: Location,
}