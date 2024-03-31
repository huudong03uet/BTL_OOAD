import Location from "./location";

export default interface Auction {
    auction_id: number,
    name: string,
    status: string,
    time_auction: Date,
    condition_coin: number,
    description?: string,
    time_register: string,
    location_id: number,
    user_id: number,
}
