export type AuctionInformation = {
    image_path?: string;
    time?: string,
    seller_name?: string;
    auction_room_name?: string;
    address?: string,

    number_watching?: number;
    voting_avg_review: number;
    number_review: number;
    images?: string[],
    status?: string,
    
}