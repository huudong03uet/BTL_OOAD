interface Review {
    id: number;
    rating: number;
    content: string;
    createdAt: Date;
    user_evaluate: number;
}

interface Location {
    id: number;
    city: string;
    country: string
}

export default interface Seller {
    id: number;
    email: string;
    name: string;
    description: string;
    phone: string,
    location: Location,
    user_id: number,
    status: string,
    reviews: Review[],
    createdAt: Date;
}
