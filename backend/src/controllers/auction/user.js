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
const { convert_result_auction_summary } = require('../util/convert');
const { get_auction, AUCTION_INCLUDE, get_auction_by_pk } = require('./conponent');
const BidHistory = require('../../models/history_bid');


let get_auction_upcomming = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let whereCondition = {
            time_auction: {
                [Op.gt]: new Date()
            },
            is_delete: false,
            [Op.or]: [
                {
                    status: AuctionStatus.PUBLIC
                },
                {
                    status: AuctionStatus.PRIVATE,
                    '$users.id$': req.params.user_id
                }
            ]
        }

        

        const auctions = await get_auction(whereCondition)
            

        // let result = convert_result_auction_summary(auctions)

        logger.info(`${statusCode.HTTP_200_OK} auction uppcomming ${auctions.length}`)
        return res.status(statusCode.HTTP_200_OK).json(auctions);
    } catch (error) {
        logger.error(`Get auction upcomming: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_promote = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let whereCondition = {
            time_auction: {
                [Op.gt]: new Date()
            },
            is_delete: false,
            [Op.or]: [
                {
                    status: AuctionStatus.PUBLIC
                },
                {
                    status: AuctionStatus.PRIVATE,
                    '$users.id$': req.params.user_id
                }
            ]
        }

        let auctionIncludes = AUCTION_INCLUDE.map(include => {
            if (include.model === Product) {
                return {
                    ...include,
                    where: {
                        visibility: AuctionProductVisibilityStatus.PUBLIC
                    },
                    limit: 1,
                    attributes: ['id'],
                };
            }
            return include;
        })

        const auctions = await get_auction(whereCondition, auctionIncludes)

        // let result = convert_result_auction_summary(auctions)

        logger.info(`${statusCode.HTTP_200_OK} auction promote ${auctions.length}`)
        return res.status(statusCode.HTTP_200_OK).json(auctions);
    } catch (error) {
        logger.error(`Get auction promote: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_info = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["auction_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let whereCondition = {
            [Op.or]: [
                { status: AuctionStatus.PUBLIC },
                { '$users.id$': req.params.user_id, status: AuctionStatus.PRIVATE }
            ]
        }

        let auctionIncludes = AUCTION_INCLUDE.map(include => {
            if (include.model === Product) {
                return {
                    model: Product,
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
                    ],
                };
            } else if (include.model == User) {
                return {
                    ...include,
                    through: { attributes: [] },
                    attributes: ['id'],
                    required: false,
                    where: { id: req.params.user_id }
                }
            }
            return include;
        })

        let auction = await get_auction_by_pk(req.params.auction_id, whereCondition, auctionIncludes)

        if (auction && auction.products) {
            auction.products.sort((a, b) => a.numerical_order - b.numerical_order);
        }

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

        logger.info(`${statusCode.HTTP_200_OK} [Auction: ${req.params.auction_id}].`)
        return res.status(statusCode.HTTP_200_OK).json({
            "infoAuction": auction,
            "lotsAuction": auction.products
        });
    } catch (error) {
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_product_in_auction = async (req, res) => {
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
            attributes: [],
            include: [
                {
                    model: Product,
                    attributes: ['id'],
                },
                {
                    model: Seller,
                    where: {
                        user_id: req.params.user_id
                    },
                    attributes: []
                }
            ]
        });

        let result = []
        for (let product of auction.products) {
            result.push(product.dataValues.id)
        }

        logger.info(`${statusCode.HTTP_200_OK} [Auction: ${req.params.auction_id}].`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_bid = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["product_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let bib_histories = await BidHistory.findAll({
            where: {
                product_id: req.params.product_id
            },
            attributes: ["amount"]
        })

        let product = await Product.findByPk(req.params.product_id)

        let result = {}
        result["id"] = req.params.product_id
        result['cost_auction'] = bib_histories.map(x => x.amount)
        result["status"] = product.status == AuctionProductStatus.SOLD ? 1 : 0;

        logger.info(`${statusCode.HTTP_200_OK} bib_histories ${bib_histories.length}.`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let add_auction_bid = async (req, res) => {
    try {
        if (!check_required_field(req.body, ["product_id", "user_id", "amount"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        await BidHistory.create(req.body)

        logger.info(`${statusCode.HTTP_200_OK} done.`)
        return res.status(statusCode.HTTP_200_OK).json("done");
    } catch (error) {
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = { 
    get_auction_upcomming, 
    get_auction_promote, 
    get_auction_info,
    get_product_in_auction,
    get_auction_bid,
    add_auction_bid,
}
