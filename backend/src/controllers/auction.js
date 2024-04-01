const logger = require("../../conf/logger");
const sequelize = require("../../conf/sequelize");
const AuctionRoomRequestStatus = require("../../constants/auction_room_request_status");
const statusCode = require("../../constants/status");
const AuctionRoom = require("../models/auction_room");
const AuctionRoomRequest = require("../models/auction_room_request");
const Image = require("../models/image");
const Product = require("../models/product");
const Seller = require("../models/seller");
const User = require("../models/user");

let create_auction = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const {
      user_id,
      name,
      condition_coin,
      location_id,
      description,
      status,
      time_auction,
    } = req.body;

    const auctionData = {
      name: name,
      status: status,
      condition_coin: condition_coin,
      description: description,
      location_id: location_id,
      time_auction: time_auction,
    };

    Object.keys(auctionData).forEach(
      (key) => auctionData[key] === undefined && delete auctionData[key]
    );

    const newAuction = await AuctionRoom.create(auctionData, {
      transaction: t,
    });

    await newAuction.addUser(user_id, { transaction: t });

    await AuctionRoomRequest.create(
      {
        status: AuctionRoomRequestStatus.NOT_YET,
        description: description,
        user_id: user_id,
        auction_room_id: newAuction.id,
      },
      { transaction: t }
    );

    await t.commit();

    logger.info(`${statusCode.HTTP_200_OK} [auction:${newAuction.id}]`);
    return res.status(statusCode.HTTP_200_OK).json(newAuction);
  } catch (error) {
    await t.rollback();
    logger.error(`Auction create: ${error}`);
    return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
  }
};

let add_user = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { auction_id, user_id } = req.body;

    const auction = AuctionRoom.findByPk(auction_id);
    const user = User.findByPk(user_id);

    if (!auction || !user) {
      logger.error(
        `${statusCode.HTTP_404_NOT_FOUND} [user:${user_id}] [auction:${auction_id}]`
      );
      return res
        .status(statusCode.HTTP_404_NOT_FOUND)
        .json("Auction or User not found");
    }

    await auction.addUser(user, { transaction: transaction });

    await transaction.commit();

    logger.info(
      `${statusCode.HTTP_200_OK} [user:${user_id}] [auction:${auction_id}]`
    );
    return res
      .status(statusCode.HTTP_200_OK)
      .json("User added to auction successfully");
  } catch (error) {
    await transaction.rollback();
    logger.error(`Auction add user: ${error}`);
    return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
  }
};

let add_product = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { auction_id, product_id } = req.body;

    const auction = AuctionRoom.findByPk(auction_id);
    const product = Product.findByPk(product_id);

    if (!auction || !product) {
      logger.error(
        `${statusCode.HTTP_404_NOT_FOUND} [product:${product_id}] [auction:${auction_id}]`
      );
      return res
        .status(statusCode.HTTP_404_NOT_FOUND)
        .json("Auction or Product not found");
    }

    await auction.addProduct(product, { transaction: transaction });

    await transaction.commit();

    logger.info(
      `${statusCode.HTTP_200_OK} [product:${product_id}] [auction:${auction_id}]`
    );
    return res
      .status(statusCode.HTTP_200_OK)
      .json("Product added to auction successfully");
  } catch (error) {
    await transaction.rollback();
    logger.error(`Auction add product: ${error}`);
    return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
  }
};

let get_all_product_of_auction = async (req, res) => {
  try {
    const auction_id = req.params.auction_id;

    const products = await Product.findAll({
      include: [
        {
          model: AuctionRoom,
          where: { id: auction_id },
        },
        {
          model: Image,
          attributes: ["url"],
          limit: 1,
        },
      ],
    });

    if (!products) {
      const auction = AuctionRoom.findByPk(auction_id);
      if (!auction) {
        logger.error(
          `${statusCode.HTTP_404_NOT_FOUND} [auction:${auction_id}]`
        );
        return res
          .status(statusCode.HTTP_404_NOT_FOUND)
          .json("Auction not found");
      }
    }

    logger.info(`${statusCode.HTTP_200_OK} [auction:${auction_id}]`);
    return res.status(statusCode.HTTP_200_OK).json(products);
  } catch (error) {
    logger.error(`Auction get product: ${error}`);
    return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
  }
};

let find_product_in_auction = async (req, res) => {
  try {
    const auction_id = req.params.auction_id;
    const q = req.params.q;

    const products = await Product.findAll({
      include: [
        {
          model: AuctionRoom,
          where: { id: auction_id },
        },
      ],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
        ],
      },
    });

    logger.info(`${statusCode.HTTP_200_OK} [auction:${auction_id}] query:${q}`);
    return res.status(statusCode.HTTP_200_OK).json(products);
  } catch (error) {
    logger.error(`Auction find product: ${error}`);
    return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
  }
};

module.exports = {
  create_auction,
  add_user,
  add_product,
  get_all_product_of_auction,
  find_product_in_auction,
};
