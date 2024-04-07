const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionStatus = require('../../../constants/auction_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const { check_required_field } = require('../util')
const Auction = require('../../models/auction');
const Product = require('../../models/product');
const Image = require('../../models/image');
const Seller = require('../../models/seller');
const Location = require('../../models/location');
const Review = require('../../models/review');
const User = require('../../models/user');


let get_auction_by_status = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const auctions = await Auction.findAll({
            where: {
                time_auction: {
                    [Op.gt]: new Date()
                },
                [Op.or]: [
                    {
                        status: AuctionStatus.PUBLIC
                    },
                    {
                        status: AuctionStatus.PRIVATE,
                        '$users.id$': req.params.user_id
                    }
                ]
            },
            include: [
                {
                    model: Product,
                    where: {
                        visibility: AuctionProductVisibilityStatus.PUBLIC
                    },
                    limit: 6,
                    attributes: ['id'],
                    include: [
                        {
                            model: Image,
                            attributes: ['id', "url"],
                            limit: 1
                        }
                    ]
                },
                {
                    model: Location,
                    attributes: [
                        [Sequelize.literal("CONCAT(country, ', ', city)"), "location"]
                    ]
                },
                {
                    model: Seller,
                    attributes: ["name"],
                    include: [
                        {
                            model: Review,
                            attributes: [
                                [Sequelize.literal('(SELECT AVG(star) FROM review WHERE review.seller_id = auction.seller_id)'), 'average_star'],
                                [Sequelize.literal('(SELECT COUNT(id) FROM review WHERE review.seller_id = auction.seller_id)'), 'count_star'],
                            ],
                        }
                    ]
                },
                {
                    model: User,
                    attributes: [],
                    through: { attributes: [] },
                    required: false
                }
            ]
        });

        let result = []

        for (let auction of auctions) {
            let out = {};
            out["time"] = auction.dataValues.time_auction;
            out["auction_room_name"] = auction.dataValues.name;
            if (auction.dataValues.seller.reviews && auction.dataValues.seller.reviews.length > 0) {
                out["number_review"] = auction.dataValues.seller.reviews[0].dataValues.count_star;
                out["voting_avg_review"] = auction.dataValues.seller.reviews[0].dataValues.average_star;
            } else {
                out["number_review"] = 0;
                out["voting_avg_review"] = 0;
            }
            let images = [];
            console.log(auction.products.length)
            for (let product of auction.products) {
                images.push(product.images[0].url);
            }
            let firstImage = images.shift();
            out["images"] = images;
            out["image_path"] = firstImage;
            out["seller_name"] = auction.seller.name;
            out["status"] = auction.status;
            out['address'] = auction.location.location

            result.push(out)
        }

        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Login: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = { get_auction_by_status }
