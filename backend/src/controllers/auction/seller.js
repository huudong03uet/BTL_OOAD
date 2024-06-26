const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const WebSocket = require('ws');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const statusCode = require('../../../constants/status');

const Auction = require('../../models/auction');
const Product = require('../../models/product');
const User = require('../../models/user');

const { check_required_field, find_or_create_location } = require('../util');
const AuctionService = require('./conponent');


// let create_auction = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["seller_id", "name", "condition_coin", "status", "time_auction"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { seller_id, time_auction } = req.body;
//         const { country, address, city, state, postal_code } = req.body.location;
//         const products = req.body.products;
//         const users = req.body.users;

//         let location = await find_or_create_location(country, address, city, state, postal_code, t)

//         const auctionData = {
//             name: req.body.name,
//             status: req.body.status,
//             condition_coin: req.body.condition_coin,
//             description: req.body.description,
//             time_auction: time_auction,
//             location_id: location.id,
//             seller_id: seller_id
//         };

//         Object.keys(auctionData).forEach(key => auctionData[key] === undefined && delete auctionData[key]);

//         const newAuction = await Auction.create(auctionData, { transaction: t });

//         let index = 1;
//         for (let product_id of products) {
//             await Product.update({ auction_id: newAuction.id, numerical_order: index }, { where: { id: product_id }, transaction: t });
//             index = index + 1;
//         }

//         const promises = users.map(async (user) => {
//             const foundUser = await User.findByPk(user.id);
//             if (foundUser) {
//                 await newAuction.addUser(foundUser, { transaction: t });
//             }
//         });
        
//         await Promise.all(promises);

//         await t.commit();

//         logger.info(`${statusCode.HTTP_200_OK} [auction:${newAuction.id}]`)
//         return res.status(statusCode.HTTP_200_OK).json(newAuction)
//     } catch (error) {
//         await t.rollback();
//         logger.error(`Auction create: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let update_auction = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["seller_id", "id", "name", "condition_coin", "status", "time_auction"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { country, address, city, state, postal_code } = req.body.location;
//         const products = req.body.products;

//         let location = await find_or_create_location(country, address, city, state, postal_code, t)

//         const auction = await Auction.findByPk(req.body.id, {
//             where: {
//                 seller_id: req.body.seller_id
//             }
//         });
        
//         if (!auction) {
//             logger.error(`${statusCode.HTTP_404_NOT_FOUND} Auction not found.`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction not found.");
//         }

//         auction.name = req.body.name;
//         auction.condition_coin = req.body.condition_coin;
//         auction.status = req.body.status;
//         auction.time_auction = req.body.time_auction;
//         auction.location_id = location.id;

//         await auction.save({ transaction: t });

//         await Product.update({ auction_id: null }, { where: { auction_id: auction.id }, transaction: t });

//         for (let product_id of products) {
//             await Product.update({ auction_id: auction.id }, { where: { id: product_id }, transaction: t });
//         }

//         await t.commit();

//         logger.info(`${statusCode.HTTP_200_OK} [auction:${auction.id}]`)
//         return res.status(statusCode.HTTP_200_OK).json(auction)
//     } catch (error) {
//         await t.rollback();
//         logger.error(`Auction create: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let add_user = async (req, res) => {
//     const transaction = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["auction_id", "user_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { auction_id, user_id } = req.body;

//         const auction = Auction.findByPk(auction_id);
//         const user = User.findByPk(user_id);

//         if (!auction || !user) {
//             logger.error(`${statusCode.HTTP_404_NOT_FOUND} [user:${user_id}] [auction:${auction_id}]`)
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or User not found");
//         }

//         await auction.addUser(user, { transaction: transaction });

//         await transaction.commit();

//         logger.info(`${statusCode.HTTP_200_OK} [user:${user_id}] [auction:${auction_id}]`)
//         return res.status(statusCode.HTTP_200_OK).json("User added to auction successfully");
//     } catch (error) {
//         await transaction.rollback();
//         logger.error(`Auction add user: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let add_product = async (req, res) => {
//     const transaction = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["auction_id", "product_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { auction_id, product_id } = req.body;

//         const auction = Auction.findByPk(auction_id);
//         const product = Product.findByPk(product_id);

//         if (!auction || !product) {
//             logger.error(`${statusCode.HTTP_404_NOT_FOUND} [product:${product_id}] [auction:${auction_id}]`)
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction or Product not found");
//         }

//         await auction.addProduct(product, { transaction: transaction });

//         await transaction.commit();

//         logger.info(`${statusCode.HTTP_200_OK} [product:${product_id}] [auction:${auction_id}]`)
//         return res.status(statusCode.HTTP_200_OK).json("Product added to auction successfully");
//     } catch (error) {
//         await transaction.rollback();
//         logger.error(`Auction add product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let get_past_auction = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id
//         }

//         let kwargs = {
//             group: ['auction.id'],
//             having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.SOLD}" THEN 1 ELSE NULL END)`)
//         }

//         let auctions = await get_auction(whereCondition, AUCTION_INCLUDE, kwargs)

//         auctions = auctions.filter(auction => auction.products.length > 0)

//         logger.info(`${statusCode.HTTP_200_OK} auction past length ${auctions.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(auctions);
//     } catch (error) {
//         logger.error(`Auction get passt: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let get_products = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const whereClause = {
//             [Op.and]: [
//                 { status: AuctionProductStatus.NOT_YET_SOLD },
//                 { seller_id: req.params.seller_id }
//             ]
//         };

//         if (req.params.auction_id !== 'null') {
//             whereClause[Op.and].push(
//                 { [Op.or]: [{ auction_id: null }, { auction_id: req.params.auction_id }] }
//             );
//         } else {
//             whereClause[Op.and].push({ auction_id: null });
//         }

//         const products = await get_product(whereClause)

//         logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Auction get product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let get_auction_history = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id
//         }

//         let kwargs = {
//             group: ['auction.id'],
//             having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.SOLD}" THEN 1 ELSE NULL END)`)
//         }

//         let auctions = await get_auction(whereCondition, AUCTION_INCLUDE, kwargs)

//         // let auctions = await _get_auction_by_status(req.params.seller_id, AuctionProductStatus.SOLD)

//         logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(auctions);
//     } catch (error) {
//         logger.error(`Auction get history: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let get_auction_not_sold = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id
//         }

//         let kwargs = {
//             group: ['auction.id'],
//             having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.NOT_YET_SOLD}" THEN 1 ELSE NULL END)`)
//         }

//         let auctions = await get_auction(whereCondition, AUCTION_INCLUDE, kwargs)

//         // let auctions = await _get_auction_by_status(req.params.seller_id, AuctionProductStatus.NOT_YET_SOLD)

//         logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(auctions);
//     } catch (error) {
//         logger.error(`Auction get history: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let get_auction_info = async(req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id", "auction_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id
//         }

//         let auction = await get_auction_by_pk(req.params.auction_id, whereCondition)

//         logger.info(`${statusCode.HTTP_200_OK} [auction: ${auction.id}]`)
//         return res.status(statusCode.HTTP_200_OK).json(auction);
//     } catch (error) {
//         logger.error(`Auction get history: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


class AuctionController extends AuctionService {
    socket_auction = async(req, res) => {
        this.websocket.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'update_auction' }));
            }
        })
    }

    create_auction = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            if (!check_required_field(req.body, ["seller_id", "name", "condition_coin", "status", "time_auction"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const { seller_id, time_auction } = req.body;
            const { country, address, city, state, postal_code } = req.body.location;
            const products = req.body.products;
            const users = req.body.users;
    
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
    
            let index = 1;
            for (let product_id of products) {
                await Product.update({ auction_id: newAuction.id, numerical_order: index }, { where: { id: product_id }, transaction: t });
                index = index + 1;
            }
    
            const promises = users.map(async (user) => {
                const foundUser = await User.findByPk(user.id);
                if (foundUser) {
                    await newAuction.addUser(foundUser, { transaction: t });
                }
            });
            
            await Promise.all(promises);
    
            await t.commit();

            // this.socket_auction()
    
            logger.info(`${statusCode.HTTP_200_OK} [auction:${newAuction.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(newAuction)
        } catch (error) {
            await t.rollback();
            logger.error(`Auction create: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    update_auction = async (req, res) => {
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

            let index = 1;
            for (let product_id of products) {
                await Product.update({ auction_id: auction.id, numerical_order: index }, { where: { id: product_id }, transaction: t });
                index = index + 1;
            }
    
            await t.commit();

            // this.update_auction()
    
            logger.info(`${statusCode.HTTP_200_OK} [auction:${auction.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(auction)
        } catch (error) {
            await t.rollback();
            logger.error(`Auction update: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_past_auction = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id
            };
    
            let kwargs = {
                ...this.kwargs,
                group: ['auction.id'],
                having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.SOLD}" THEN 1 ELSE NULL END)`)
            }
    
            let auctions = await this.get_auction(where_case, this.include, kwargs)
    
            auctions = auctions.filter(auction => auction.products.length > 0)
    
            logger.info(`${statusCode.HTTP_200_OK} auction past length ${auctions.length}`)
            return res.status(statusCode.HTTP_200_OK).json(auctions);
        } catch (error) {
            logger.error(`Auction get passt: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_products = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                [Op.and]: [
                    { status: AuctionProductStatus.NOT_YET_SOLD },
                    { seller_id: req.params.seller_id },
                    { inspect_id: { [Op.ne]: null } }
                ]
            };
    
            if (req.params.auction_id !== 'null') {
                where_case[Op.and].push(
                    { [Op.or]: [{ auction_id: null }, { auction_id: req.params.auction_id }] }
                );
            } else {
                where_case[Op.and].push({ auction_id: null });
            }
    
            const products = await this.get_product(where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Auction get product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_auction_history = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id
            };
    
            let kwargs = {
                ...this.kwargs,
                group: ['auction.id'],
                having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.SOLD}" THEN 1 ELSE NULL END)`)
            }
    
            let auctions = await this.get_auction(where_case, this.include, kwargs)
    
            logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
            return res.status(statusCode.HTTP_200_OK).json(auctions);
        } catch (error) {
            logger.error(`Auction get history: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_auction_not_sold = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id
            };
    
            let kwargs = {
                ...this.kwargs,
                group: ['auction.id'],
                having: Sequelize.literal(`COUNT(products.id) = COUNT(CASE WHEN products.status = "${AuctionProductStatus.NOT_YET_SOLD}" THEN 1 ELSE NULL END)`)
            }
    
            let auctions = await this.get_auction(where_case, this.include, kwargs)
    
            logger.info(`${statusCode.HTTP_200_OK} auction history length ${auctions.length}`)
            return res.status(statusCode.HTTP_200_OK).json(auctions);
        } catch (error) {
            logger.error(`Auction get history: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_auction_info = async(req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id", "auction_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id
            };
    
            let auction = await this.get_auction_by_pk(req.params.auction_id, where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} [auction: ${auction.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(auction);
        } catch (error) {
            logger.error(`Auction get history: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}


module.exports = new AuctionController()

// module.exports = {
//     create_auction,
//     add_user,
//     add_product,
//     get_past_auction,
//     get_products,
//     get_auction_history,
//     get_auction_not_sold,
//     update_auction,
//     get_auction_info
// }
