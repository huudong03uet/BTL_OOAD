interface Image {
    id?: number,
    url: string,
}
interface Category {
    id?: number,
    title?: string;
}
interface Seller {
    user_id?: number,
    name: string,
}

export type FormRegisterProduct = {
    product_id: number;
    seller?: Seller;
    images?: Image[];
    title: string;
    status: string;
    estimate_min?: number;
    estimate_max?: number;
    description?: string;
    dimensions?: string;
    artist?: string;
    category?: Category[];
    condition_report?: string;
    provenance?: string;
    time_create: string;

};