const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const statusCode = require('../../../constants/status');

const Auction = require('../../models/auction');
const Product = require('../../models/product');
const User = require('../../models/user');

const { check_required_field, find_or_create_location } = require('../util');
const Seller = require('../../models/seller');
const Location = require('../../models/location');
const { convert_result_item_summary } = require('../util/convert');
const { set_value_redis } = require('../util/redis');
const Admin = require('../../models/admin');


let create_auction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["seller_id", "name", "condition_coin", "status", "time_auction"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { seller_id, time_auction } = req.body;
        const { country, address, city, state, postal_code } = req.body.location;
        const products = req.body.products;

        let location = await find_or_create_location(country, address, city, state, postal_code, t)

        const auctionData = {
            name: req.body.name,
            status: req.body.status,
            condition_coin: req.body.condition_coin,
            description: req.body.description,
            time_auction: time_auction,
            location_id: location.id,
            seller_id: seller_id
        };

        Object.keys(auctionData).forEach(key => auctionData[key] === undefined && delete auctionData[key]);

        const newAuction = await Auction.create(auctionData, { transaction: t });

        for (let product_id of products) {
            await Product.update({ auction_id: newAuction.id }, { where: { id: product_id }, transaction: t });
        }

        await t.commit();

        logger.info(`${statusCode.HTTP_200_OK} [auction:${newAuction.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(newAuction)
    } catch (error) {
        await t.rollback();
        logger.error(`Auction create: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let update_auction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["seller_id", "id", "name", "condition_coin", "status", "time_auction"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { country, address, city, state, postal_code } = req.body.location;
        const products = req.body.products;

        let location = await find_or_create_location(country, address, city, state, postal_code, t)

        const auction = await Auction.findByPk(req.body.id, {
            where: {
                seller_id: req.body.seller_id
            }
        });
        
        if (!auction) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} Auction not found.`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction not found.");
        }

        auction.name = req.body.name;
        auction.condition_coin = req.body.condition_coin;
        auction.status = req.body.status;
        auction.time_auction = req.body.time_auction;
        auction.location_id = location.id;

        await auction.save({ transaction: t });

        await Product.update({ auction_id: null }, { where: { auction_id: auction.id }, transaction: t });

        for (let product_id of products) {
            await Product.update({ auction_id: auction.id }, { where: { id: product_id }, transaction: t });
        }

        await t.commit();

        logger.info(`${statusCode.HTTP_200_OK} [auction:${auction.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(auction)
    } catch (error) {
        await t.rollback();
        logger.error(`Auction create: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let add_user = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["auction_id", "user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { auction_id, user_id } = req.body;

        const auction = Auction.findByPk(auction_id);
        const user = User.findByPk(user_id);

        if (!auction || !user) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} [user:${user_id}] [auction:${auction_id}]`)
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or User not found");
        }

        await auction.addUser(user, { transaction: transaction });

        await transaction.commit();

        logger.info(`${statusCode.HTTP_200_OK} [user:${user_id}] [auction:${auction_id}]`)
        return res.status(statusCode.HTTP_200_OK).json("User added to auction successfully");
    } catch (error) {
        await transaction.rollback();
        logger.error(`Auction add user: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let add_product = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["auction_id", "product_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const { auction_id, product_id } = req.body;

        const auction = Auction.findByPk(auction_id);
        const product = Product.findByPk(product_id);

        if (!auction || !product) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} [product:${product_id}] [auction:${auction_id}]`)
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or Product not found");
        }

        await auction.addProduct(product, { transaction: transaction });

        await transaction.commit();

        logger.info(`${statusCode.HTTP_200_OK} [product:${product_id}] [auction:${auction_id}]`)
        return res.status(statusCode.HTTP_200_OK).json("Product added to auction successfully");
    } catch (error) {
        await transaction.rollback();
        logger.error(`Auction add product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let _get_auction_by_status = async(seller_id, status) => {
    try {
        let auctions = await Auction.findAll({
            where: {
                seller_id: seller_id
            },
            include: [
                {
                    model: Product,
                    attributes: [],
                    where: {
                        status: status
                    }
                },
                {
                    model: Location,
                    attributes: [
                        [Sequelize.literal("CONCAT(country, ', ', city)"), "location"]
                    ]
                }
            ],
            group: ['auction.id'],
            having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${status}" THEN 1 ELSE NULL END)`)
        });

        return auctions
    } catch (error) {
        throw error;
    }
}

let get_past_auction = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let auctions = await _get_auction_by_status(req.params.seller_id, AuctionProductStatus.SOLD)


        let result = []

        for (let auction of auctions) {
            let out = {}
            out["date"] = auction.dataValues.time_auction
            out["title"] = auction.dataValues.name
            out["location"] = auction.dataValues.location.dataValues.location
            result.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} auction past length ${result.length}`)
        return res.status(statusCode.HTTP_200_OK).json(result);
    } catch (error) {
        logger.error(`Auction get passt: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_product = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const whereClause = {
            [Op.and]: [
                { status: AuctionProductStatus.NOT_YET_SOLD },
                {
                    [Op.or]: [
                        { seller_id: req.params.seller_id },
                        { visibility: AuctionProductVisibilityStatus.PUBLIC }
                    ]
                }
            ]
        };

        if (req.params.auction_id !== 'null') {
            whereClause[Op.and].push(
                { [Op.or]: [{ auction_id: null }, { auction_id: req.params.auction_id }] }
            );
        } else {
            whereClause[Op.and].push({ auction_id: null });
        }

        const products = await Product.findAll({
            where: whereClause
        });

        let reesult = convert_result_item_summary(products)

        logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
        return res.status(statusCode.HTTP_200_OK).json(reesult);
    } catch (error) {
        logger.error(`Auction get product: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_history = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let auctions = await _get_auction_by_status(req.params.seller_id, AuctionProductStatus.SOLD)

        logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
        return res.status(statusCode.HTTP_200_OK).json(auctions);
    } catch (error) {
        logger.error(`Auction get history: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_not_sold = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let auctions = await _get_auction_by_status(req.params.seller_id, AuctionProductStatus.NOT_YET_SOLD)

        logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
        return res.status(statusCode.HTTP_200_OK).json(auctions);
    } catch (error) {
        logger.error(`Auction get history: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let get_auction_info = async(req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id", "auction_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let auction = await Auction.findByPk(req.params.auction_id, {
            where: {
                seller_id: req.params.seller_id
            }
        })

        logger.info(`${statusCode.HTTP_200_OK} [auction: ${auction.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(auction);
    } catch (error) {
        logger.error(`Auction get history: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = {
    create_auction,
    add_user,
    add_product,
    get_past_auction,
    get_product,
    get_auction_history,
    get_auction_not_sold,
    update_auction,
    get_auction_info
}
