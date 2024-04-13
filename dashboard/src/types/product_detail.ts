interface Image {
    id: number,
    url: string,
}


export type ProductDetail = {
    id: number;
    images?: Image[];
    title: string;
    status: string;
    count_bid?: number;
    max_bid?: number;
    max_estimate?: number;
    min_estimate?: number;
    description: string;
    dimensions: string;
    artist: string;
    condition_report?: string;
    provenance?: string;
}