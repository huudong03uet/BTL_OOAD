
//  chọn cái anyf
import BidHistory from './bid_history';



interface Image {
    id: number,
    url: string,
}

interface Inspection {
    id: number;
    admin_id: number;
    description: string;
    status: string;
}

interface Category {
    id: number;
    title: string;
}

interface Seller {
    id: number;
    name: string;
}

interface Auction {
    id: number;
    name: string;
    time_auction: Date;
}

export default interface Product {
    id: number;
    images: Image[];
    title: string;
    status: string;
    numerical_order?: number;
    max_bid?: number;
    min_estimate?: number;
    max_estimate?: number;
    bid_histories?: BidHistory[];
    description: string;
    dimensions: string;
    artist: string;
    love?: number;
    condition_report?: string;
    provenance?: string;
    inspection: Inspection | null;
    visibility: string;
    categories: Category[];
    seller: Seller;
    createdAt: string;
    auction: Auction;
}