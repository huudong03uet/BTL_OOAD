
export default interface Auction {
    id: number,
    name: string,
    status: string,
    time_auction: Date,
    condition_coin: number,
    description?: string,
    time_register: string,
    location_id: number,
    seller_id: number,
}
