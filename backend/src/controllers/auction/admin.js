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
const AuctionService = require('./conponent');


class AuctionController extends AuctionService {
    service_auctions = async (req, res) => {
        try {
            // let where_case = {
            //     ...this.where_case,
            //     is_delete: false,
            // }
            let auctions = await this.get_auction()
            return res.status(statusCode.HTTP_200_OK).json(auctions)
        } catch (error) {
            logger.error(`Auction get: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_delete_auctions = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["auction_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            const deletedAuction = await Auction.update(
                {
                    is_delete: true
                },
                {
                    where: {
                        id: req.params.auction_id
                    }
                }
            )

            if (deletedAuction === 0) {
                logger.error(`${statusCode.HTTP_404_NOT_FOUND} Auction not found.`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Auction not found.");
            }

            return res.status(statusCode.HTTP_200_OK).json("Auction deleted successfully.");
        } catch (error) {
            logger.error(`Auction get: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}


module.exports = new AuctionController()
