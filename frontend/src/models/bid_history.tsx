export default interface BidHistory {
    id: number;
    description: string;
    amount: number;
    product_id: number;
    user_id: number;
    createdAt: string;
    winner_id: number;
}