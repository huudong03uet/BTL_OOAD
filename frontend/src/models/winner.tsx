import BidHistory from "./bid_history";

export default interface Winner {
    id: number;
    createdAt: string;
    updatedAt: string;
    product_id: number;
    bid_history_id: number;
    bid_history: BidHistory;

}

