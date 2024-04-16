export default interface ItemSummary {
    id: number,
    status?: string,
    title: string,
    love?: number,
    estimate_min?: number,
    estimate_max?: number,
    max_bid?: number,
    price?: number,
    artist?: string,
    time?: string,
    image_path: string,
    user_sell?: string;
    seller_id?: number;
}