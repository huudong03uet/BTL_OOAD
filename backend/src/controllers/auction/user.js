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
const LoveProduct = require('../../models/product_love');


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


let get_auction_promote = async (req, res) => {
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
                    limit: 1,
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
                    model: Seller,
                    attributes: ["name"],
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
        let atLeastOneAdded = false;

        for (let auction of auctions) {
            if (Math.random() < 0.5) {
                continue
            }
            let out = {};
            out["time"] = auction.dataValues.time_auction;
            out["image_path"] = auction.products[0].images[0].url;
            out["seller_name"] = auction.seller.name;
            out["status"] = auction.status;
            out["title"] = auction.dataValues.title;

            result.push(out)
            atLeastOneAdded = true;
        }

        if (!atLeastOneAdded && auctions.length > 0) {
            let randomIndex = Math.floor(Math.random() * auctions.length);
            let auction = auctions[randomIndex];
            let out = {};
            out["time"] = auction.dataValues.time_auction;
            out["image_path"] = auction.products[0].images[0].url;
            out["seller_name"] = auction.seller.name;
            out["status"] = auction.status;
            out["title"] = auction.dataValues.title;

            result.push(out);
        }

        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Login: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_info = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["auction_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let auction = await Auction.findByPk(req.params.auction_id, {
            where: {
                [Op.or]: [
                    { status: AuctionStatus.PUBLIC },
                    { '$users.id$': req.params.user_id, status: AuctionStatus.PRIVATE }
                ]
            },
            include: [
                {
                    model: Product,
                    where: {
                        visibility: AuctionProductVisibilityStatus.PUBLIC
                    },
                    include: [
                        {
                            model: Image,
                            attributes: ['id', 'url'],
                            limit: 1
                        },
                        {
                            model: LoveProduct,
                            attributes: ['id'],
                        }
                    ]
                },
                {
                    model: Seller,
                    attributes: ['name'],
                    include: [
                        {
                            model: Review,
                            attributes: [
                                [sequelize.literal('(SELECT AVG(star) FROM review WHERE review.seller_id = auction.seller_id)'), 'average_star'],
                                [sequelize.literal('(SELECT COUNT(id) FROM review WHERE review.seller_id = auction.seller_id)'), 'count_star']
                            ]
                        },
                        
                    ]
                },
                {
                    model: Location,
                    attributes: [[Sequelize.literal("CONCAT(country, ', ', city)"), "location"]],
                },
                {
                    model: User,
                    attributes: ['id'],
                    through: { attributes: [] },
                    required: false,
                    where: { id: req.params.user_id }
                }
            ]
        });

        if (!auction) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} Auction not found.`)
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction not found.");
        }

        if (auction.dataValues.status == AuctionStatus.PRIVATE) {
            let check = false;
            for (let user of auction.dataValues.users) {
                if (user.dataValues.id == req.params.user_id) {
                    check = true;
                    break;
                }
            }

            if (!check) {
                logger.error(`${statusCode.HTTP_403_FORBIDDEN} You are not allowed to access this auction.`)
                return res.status(statusCode.HTTP_403_FORBIDDEN).json("You are not allowed to access this auction.");
            }
        }

        let infoAuction = {};
        infoAuction["time"] = auction.dataValues.time_auction;
        infoAuction["auction_room_name"] = auction.dataValues.name;
        if (auction.dataValues.seller.reviews && auction.dataValues.seller.reviews.length > 0) {
            infoAuction["number_review"] = auction.dataValues.seller.reviews[0].dataValues.count_star;
            infoAuction["voting_avg_review"] = auction.dataValues.seller.reviews[0].dataValues.average_star;
        } else {
            infoAuction["number_review"] = 0;
            infoAuction["voting_avg_review"] = 0;
        }
        let images = [];
        for (let product of auction.products) {
            images.push(product.images[0].url);
        }
        let firstImage = images.shift();
        infoAuction["images"] = images;
        infoAuction["image_path"] = firstImage;
        infoAuction["seller_name"] = auction.seller.name;
        infoAuction["status"] = auction.status;
        infoAuction['address'] = auction.location.location

        let lotsAuction = []
        for (let product of auction.products) {
            let out = {}
            out["status"] = product.status
            out["title"] = product.title
            out["id"] = product.id
            out["max_bid"] = product.max_estimate
            out["estimate_min"] = product.min_estimate
            out["image_path"] = product.images[0].url
            out["love"] = product.love_products.length
            lotsAuction.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} [Auction: ${req.params.auction_id}].`)
        return res.status(statusCode.HTTP_200_OK).json({
            "infoAuction": infoAuction,
            "lotsAuction": lotsAuction
        });
    } catch (error) {
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = { get_auction_by_status, get_auction_promote, get_auction_info }
