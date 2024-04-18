const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const Card = require('../../models/card');
const Location = require('../../models/location');
const Review = require('../../models/review');
const Seller = require('../../models/seller');
const User = require('../../models/user');
const { check_required_field, find_or_create_location } = require('../util');
const { role_edit_profile, role_change_password, role_forgot_password } = require('./role');


const edit_profile = async (req, res) => {
    return await role_edit_profile(req, res, Seller)
}


const change_password = async(req, res) => {
    return await role_change_password(req, res, Seller)
}


let forgot_password = async (req, res) => {
    return await role_forgot_password(req, res, Seller)
}

let register = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["user_id", "seller_info", "card_info", "location_info"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        if (!check_required_field(req.body.seller_info, ["name", "email", "phone", "description"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        if (!check_required_field(req.body.card_info, ["id", "name_card"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const user_id = req.body.user_id;
        const {name, email, phone, description} = req.body.seller_info;
        const {id, expiry, cvn, name_card } = req.body.card_info;
        const {country, address, city, state, postal} = req.body.location_info;
        let seller = await Seller.findOne({
            where: {
                user_id: user_id
            }
        })

        if (seller) {
            logger.info(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [seller:${seller.id}]`)
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json(seller)
        }

        let location = await find_or_create_location(country, address, city, state, postal, t)

        seller = await Seller.create({
            name: name,
            email: email,
            phone: phone,
            desciption: description,
            user_id: user_id,
            location_id: location.id
        }, {transaction: t});

        await User.update({ seller_id: seller.id }, { where: { id: user_id }, transaction: t });

        let card = await Card.create({
            id: id,
            expiry: expiry,
            CVN: cvn,
            name: name_card,
            seller_id: seller.id
        }, {transaction: t})

        await t.commit()

        logger.info(`Create seller: [user:${user_id}] [seller:${seller.id}] [location:${location.id}] [card:${card.id}]`)
        return res.status(statusCode.HTTP_201_CREATED).json(seller)
    } catch (error) {
        await t.rollback();
        logger.error(`Create seller: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let _get_info_seller = async (user_id) => {
    try {
        let seller = await Seller.findOne({
            where: {
                user_id: user_id
            },
            include: [
                {
                    model: Location,
                    attributes: ["x", "y"]
                },
                {
                    model: Review,
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('star')), 'avg_star'],
                    ],
                }
            ]
        });

        return seller;
    } catch (error) {
        throw error
    }
}

let get_info_seller = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let seller = await Seller.findByPk(req.params.seller_id, {
            include: [
                {
                    model: Location,
                },
                {
                    model: Review,
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('star')), 'avg_star'],
                    ],
                }
            ]
        });

        if (!seller) {
            logger.info(`${statusCode.HTTP_400_BAD_REQUEST} Không tìm thấy seller`)
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Không tìm thấy seller")
        }

        // let result = {}
        // result["auctionHouse_id"] = seller.dataValues.id
        // result["auctionHouse_name"] = seller.dataValues.name
        // result["auctionHouse_createdTime"] = seller.dataValues.createdAt
        // result["auctionHouse_location"] = {"x": seller.dataValues.location.dataValues.x, "y": seller.dataValues.location.dataValues.y}
        // if (seller.dataValues.reviews.length > 0) {
        //     result["auctionHouse_vote"] = seller.dataValues.reviews[0].dataValues.avg_star;
        // } else {
        //     result["auctionHouse_vote"] = 0;
        // }
        console.log(seller.dataValues.reviews[0])
        

        logger.info(`${statusCode.HTTP_200_OK} [seller: ${seller.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(seller)
    } catch (error) {
        logger.error(`get info seller error: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

let get_seller_by_user_id = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let seller = await Seller.findOne({
            where: {
                user_id: req.params.user_id
            },
            include: [
                {
                    model: Location,
                    attributes: ["x", "y"]
                },
                {
                    model: Review,
                    attributes: [
                        [sequelize.fn('AVG', sequelize.col('star')), 'avg_star'],
                    ],
                }
            ]
        });

        if (!seller) {
            logger.info(`${statusCode.HTTP_400_BAD_REQUEST} Không tìm thấy seller`)
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Không tìm thấy seller")
        }

        logger.info(`${statusCode.HTTP_200_OK} [seller: ${seller.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(seller)
    } catch (error) {
        logger.error(`get info seller by user: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.findAll({
            include: [
                {
                    model: Location,
                }
            ]
        });

        if (!sellers || sellers.length === 0) {
            logger.info(`${statusCode.HTTP_404_NOT_FOUND} No sellers found`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("No sellers found");
        }
        console.log(sellers);

        // Map over the sellers array to extract required properties
        const formattedSellers = await Promise.all(sellers.map(async seller => {
            const card = await Card.findOne({
                where: {
                    seller_id: seller.id
                }
            });
            
            return {
                seller_id: seller.id,
                name: seller.name,
                status: seller.status,
                phoneNumber: seller.phone,
                email: seller.email,
                description: seller.desciption,
                card_number: card ? card.id : null,
                expiry: card ? card.expiry : null,
                cvn: card ? card.cvn : null,
                nameOnCard: card ? card.name : null,
                country: seller.location?.country,
                address: seller.location?.address,
                city: seller.location?.city,
                state: seller.location?.state,
                postalCode: seller.location?.postal,
                time_create: seller.createdAt,
            };
        }));

        logger.info(`${statusCode.HTTP_200_OK} All sellers retrieved successfully`);
        return res.status(statusCode.HTTP_200_OK).json(formattedSellers);
    } catch (error) {
        logger.error(`Error getting all sellers: ${error}`);
        return res.status(statusCode.HTTP_500_INTERNAL_SERVER_ERROR).json("Internal server error");
    }
}

const handle_verification_seller = async (req, res) => {
    try {
        const { seller_id, status } = req.body;

        // Kiểm tra xem có đủ thông tin không
        if (!seller_id || !status) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        // Kiểm tra xem status có hợp lệ không
        if (status !== 'processing' && status !== 'accept' && status !== 'rejected') {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Invalid status.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Invalid status.");
        }

        // Tìm và cập nhật thông tin của seller
        const seller = await Seller.findByPk(seller_id);
        if (!seller) {
            logger.error(`${statusCode.HTTP_404_NOT_FOUND} Seller not found.`);
            return res.status(statusCode.HTTP_404_NOT_FOUND).json("Seller not found.");
        }

        seller.status = status;
        await seller.save();

        logger.info(`${statusCode.HTTP_200_OK} Seller status updated successfully.`);
        return res.status(statusCode.HTTP_200_OK).json("Seller status updated successfully.");
    } catch (error) {
        logger.error(`Error handling seller verification: ${error}`);
        return res.status(statusCode.HTTP_500_INTERNAL_SERVER_ERROR).json("Internal server error");
    }
}


module.exports = {
    edit_profile,
    change_password,
    forgot_password,
    register,
    get_info_seller,
    get_seller_by_user_id,
    getAllSellers,
    handle_verification_seller
};
