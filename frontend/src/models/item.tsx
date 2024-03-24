export default interface Item {
    id: number;
    images: string[];
    title: string;
    status: string;
    count_bid?: number;
    max_bid?: number;
    estimate_min?: number;
    estimate_max?: number;
    description: string;
    dimensions: string;
    artist: string;
    condition_report?: string;
    provenance?: string;
}