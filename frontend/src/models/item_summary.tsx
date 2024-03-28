export default interface ItemSummary {
    id: number,
    status?: string,
    title: string,
    love?: number,
    estimate_min?: number,
    max_bid?: number,
    artist?: string,
    time?: string,
    image_path: string,
    user_sell?: string;
}