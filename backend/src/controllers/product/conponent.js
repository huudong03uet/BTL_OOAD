const { Op } = require('sequelize');
const WebSocket = require('ws');

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product')
const Image = require('../../models/image')
const Category = require('../../models/category')
const Seller = require('../../models/seller')
const Inspection = require('../../models/inspection')
const Auction = require('../../models/auction')
const BidHistory = require('../../models/history_bid');
const { check_required_field } = require('../util');
const websocket = require('../../../conf/web_socket');


const PRODUCT_INCLUDE = [
    {
        model: Image,
        attributes: ["id", "url"],
    },
    {
        model: BidHistory
    },
    {
        model: Inspection
    },
    {
        model: Category,
        attributes: ["id", 'title']
    },
    {
        model: Seller,
        attributes: ['id', 'name']
    },
    {
        model: Auction,
        attributes: ['id', 'name', 'time_auction']
    },
];


class ProductService {
    constructor () {
        this.websocket = websocket
        this.where_case = {}
        this.include = [
            {
                model: Image,
                attributes: ["id", "url"],
            },
            // {
            //     model: BidHistory
            // },
            // {
            //     model: Inspection
            // },
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
        ]
        this.kwargs = {}
    }

    socket_product = async (req, res) => {
        this.websocket.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ event: 'update_product' }));
            }
        });
    }

    async get_product(where_cause = this.where_case, include = this.include, kwargs = this.kwargs) {
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

    async get_product_by_pk(product_id, where_cause = this.where_case, include = this.include, kwargs = this.kwargs) {
        try {
            let product = await Product.findByPk(product_id, {
                where: where_cause,
                include: include,
                ...kwargs
            });

            logger.info(`[product: ${product_id}]`);
            return product;
        } catch (error) {
            logger.error(`Product: ${error}`);
            throw new Error('Request timeout');
        }
    }
}


module.exports = ProductService;


// let get_product = async (whereCondition, productIncludes = PRODUCT_INCLUDE) => {
//     try {
//         let products = await Product.findAll({
//             where: whereCondition,
//             include: productIncludes
//         });

//         logger.info(`Product length: ${products.length}`)
//         return products;
//     } catch (error) {
//         logger.error(`Get product: ${error}`)
//         throw new Error('Request timeout');
//     }
// }


// let get_product_by_pk = async (product_id, whereCondition = {}, productIncludes = PRODUCT_INCLUDE) => {
//     try {
//         let product = await Product.findByPk(product_id, {
//             where: whereCondition,
//             include: productIncludes
//         });

//         logger.info(`[product: ${product_id}]`)
//         return product;
//     } catch (error) {
//         logger.error(`Product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// module.exports = {
//     PRODUCT_INCLUDE,
//     get_product,
//     get_product_by_pk
// }
