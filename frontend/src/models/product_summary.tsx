export default interface ItemSummary {
    id: number,
    status?: string,
    title: string,
    love?: number,
    min_estimate?: number,
    max_estimate?: number,
    max_bid?: number,
    price?: number,
    artist?: string,
    time?: string,
    image_path: string,
    user_sell?: string;
    seller_id?: number;
}