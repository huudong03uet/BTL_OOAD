export default interface ProductSummary {
    id: number,
    status?: string,
    title: string,
    love?: number,
    estimate_min?: number,
    max_bid?: number,
    price?: number,
    artist?: string,
    time?: string,
    image_path: string,
    user_sell?: string;
}