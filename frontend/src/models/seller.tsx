import Location from "./location";

interface Review {
    id: number;
    rating: number;
    content: string;
    createdAt: Date;
    user_evaluate: number;
}


export default interface Seller {
    id: number;
    email: string;
    name: string;
    description: string;
    phone: string,
    location_id: number,
    user_id: number,
    status: string,
    reviews: Review[],
    location?: Location,
}
