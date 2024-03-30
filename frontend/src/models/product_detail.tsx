interface Image {
    id: number,
    path: string,
}


export default interface ProductDetail {
    id: number;
    images: Image[];
    title: string;
    status: string;
    count_bid?: number;
    max_bid?: number;
    estimate_min?: number;
    estimate_max?: number;
    description: string;
    dimensions: string;
    artist: string;
    love?: number;
    condition_report?: string;
    provenance?: string;
}