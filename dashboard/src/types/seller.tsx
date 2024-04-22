import Location from "./location";
interface Review {
    id: number;
    rating: number;
    content: string;
    createdAt: Date;
    user_evaluate: number;
}
interface CardProps {
    id: number;
    name: string;
    expiry: string;
    cvn: string;

}


export  type Seller = {
    id: number;
    email: string;
    name: string;
    description: string;
    phone: string,
    location?: Location,
    user_id: number,
    status: string,
    reviews: Review[],
    card?: CardProps
    createdAt: String;
}
