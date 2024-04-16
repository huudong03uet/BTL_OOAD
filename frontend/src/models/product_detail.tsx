
//  chọn cái anyf
interface Image {
    id: number,
    url: string,
}


export default interface ProductDetail {
    id: number;
    images: Image[];
    title: string;
    status: string;
    numerical_order?: number;
    max_bid?: number;
    min_estimate?: number;
    max_estimate?: number;
    price?:number;
    description: string;
    dimensions: string;
    artist: string;
    love?: number;
    condition_report?: string;
    provenance?: string;
}