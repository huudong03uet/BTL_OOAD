let convert_result_item_summary = (products) => {
    try {
        let result = []
        for(let product of products) {
            let out = {}
            out["id"] = product.id
            out["status"] = product.status
            out["title"] = product.title
            out["estimate_min"] = product.min_estimate
            out["estimate_max"] = product.max_estimate
            out["artist"] = product.artist
            out["time"] = product.createdAt

            result.push(out)
        }

        return result
    } catch (error) {
        throw error
    }
}


let convert_result_auction_summary = (auctions) => {
    try {
        let result = []
        
        for (let auction of auctions) {
            let out = {};
            out["time"] = auction.time_auction;
            out["title"] = auction.name;
            out["auction_room_name"] = auction.name;
            out["number_review"] = auction.seller ? auction.seller.count : 0;
            out["voting_avg_review"] = auction.seller ? auction.seller.avg_star : 0;
            let images = [];
            for (let product of auction.products) {
                if (product.images.length > 0) {
                    images.push(product.images[0].url);
                }
            }
            let firstImage = images.shift();
            out["images"] = images;
            out["image_path"] = firstImage;
            out["seller_name"] = auction.seller ? auction.seller.name : '';
            out["status"] = auction.status;
            out['address'] = auction.location ? auction.location.dataValues.location : '';

            result.push(out)
        }

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    convert_result_item_summary,
    convert_result_auction_summary
};

