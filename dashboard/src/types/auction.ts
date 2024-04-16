// chọn cái này

import Product from "./product";
import Seller from "./seller";


export default interface Auction {
    id: number,
    name: string,
    status: string,
    time_auction: Date,
    condition_coin: number,
    description?: string,
    time_register: string,
    location: Location,
    seller: Seller,

    products: Product[],
}
