const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const WebSocket = require('ws');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const statusCode = require('../../../constants/status');
const Category = require('../../models/category')
const Auction = require('../../models/auction');
const Product = require('../../models/product');
const User = require('../../models/user');
const Seller = require('../../models/seller');
const Location = require('../../models/location');
const Admin = require('../../models/admin');
const Review = require('../../models/review');

const Image = require('../../models/image');
const websocket = require('../../../conf/web_socket');


const AUCTION_INCLUDE = [
    {
        model: Seller,
        attributes: ['id', 'name'],
        include: [
            {
                model: Review
            }
        ]
    },
    {
        model: Product,
        include: [
            {
                model: Image,
                attributes: ["id", "url"],
                limit: 1,
            }
        ]
    },
    {
        model: Location
    },
    {
        model: User,
    }
];

class AuctionService {
    constructor () {
        this.websocket = websocket
        this.where_case = {}
        this.include = [
            {
                model: Seller,
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Review
                    }
                ]
            },
            {
                model: Product,
                include: [
                    {
                        model: Image,
                        attributes: ["id", "url"],
                        limit: 1,
                    }
                ]
            },
            {
                model: Location
            },
            {
                model: User,
            }
        ];
        this.kwargs = {}
    }

    socket_bid_update = async (req, res) => {
        this.websocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'update_bid' }));
            }
        });
    }

    get_auction = async (where_cause = this.where_case, include = this.include, kwargs = this.kwargs) => {
        try {
            where_cause = {
                is_delete: false,
                ...where_cause
            }
            let auctions = await Auction.findAll({
                where: where_cause,
                include: include,
                ...kwargs
            });
    
            logger.info(`Product length: ${auctions.length}`)
            return auctions;
        } catch (error) {
            logger.error(`Get product: ${error}`)
            throw new Error('Request timeout');
        }
    }

    get_auction_by_pk = async (auction_id, where_cause = this.where_case, include = this.include, kwargs = this.kwargs) => {
        try {
            let auctions = await Auction.findByPk(auction_id, {
                where: where_cause,
                include: include,
                ...kwargs
            });
    
            logger.info(`Product length: ${auctions.length}`)
            return auctions;
        } catch (error) {
            logger.error(`Get product: ${error}`)
            throw new Error('Request timeout');
        }
    }
    async get_product(where_cause = this.where_case, include = [
        {
            model: Image,
            attributes: ["id", "url"],
        },
        {
            model: Category,
            attributes: ["id", 'title']
        },
        {
            model: Seller,
        },
        {
            model: Auction,
        },
    ], kwargs = this.kwargs) {
        try {
            let products = await Product.findAll({
                where: where_cause,
                include: include,
                ...kwargs
            });

            logger.info(`Product length: ${products.length}`);
            return products;
        } catch (error) {
            logger.error(`Get product: ${error}`);
            throw new Error('Request timeout');
        }
    }

}



module.exports = AuctionService;

// let get_auction = async (whereCondition, auctionIncludes = AUCTION_INCLUDE, kwargs = {}) => {
//     try {
//         let auctions = await Auction.findAll({
//             where: whereCondition,
//             include: auctionIncludes,
//             ...kwargs,
//         });

//         logger.info(`Product length: ${auctions.length}`)
//         return auctions;
//     } catch (error) {
//         logger.error(`Get product: ${error}`)
//         throw new Error('Request timeout');
//     }
// }


// let get_auction_by_pk = async (auction_id, whereCondition, auctionIncludes = AUCTION_INCLUDE, kwargs = {}) => {
//     try {
//         let auctions = await Auction.findByPk(auction_id, {
//             where: whereCondition,
//             include: auctionIncludes,
//             ...kwargs,
//         });

//         logger.info(`Product length: ${auctions.length}`)
//         return auctions;
//     } catch (error) {
//         logger.error(`Get product: ${error}`)
//         throw new Error('Request timeout');
//     }
// }


// module.exports = {
//     AUCTION_INCLUDE,
//     get_auction,
//     get_auction_by_pk
// }
