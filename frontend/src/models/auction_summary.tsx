export default interface AuctionSummary {
    id:number,
    image_path?: string,
    time?: string,
    title?: string,
    seller_name?: string,

    auction_room_name?: string;
    address?: string,

    number_watching?: number;
    voting_avg_review: number;
    number_review: number;
    images?: string[],
    status?: string,
}
