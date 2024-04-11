const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const Card = require('../../models/card');
const Location = require('../../models/location');
const Review = require('../../models/review');
const Seller = require('../../models/seller');
const User = require('../../models/user');
const { check_required_field } = require('../util');
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

        if (!check_required_field(req.body.seller_info, ["name", "email", "phone", "desciption"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        if (!check_required_field(req.body.card_info, ["id", "name_card"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const user_id = req.body.user_id;
        const {name, email, phone, desciption} = req.body.seller_info;
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
            desciption: desciption,
            user_id: user_id,
            location_id: location.id
        }, {transaction: t});

        await User.update({ seller_id: seller.id }, { where: { id: user_id }, transaction: t });

        let card = await Card.create({
            id: id,
            expiry: expiry,
            cvn: cvn,
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
        if (!check_required_field(req.params, ["user_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        let seller = await _get_info_seller(req.params.user_id)

        if (!seller) {
            logger.info(`${statusCode.HTTP_400_BAD_REQUEST} Không tìm thấy seller`)
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Không tìm thấy seller")
        }

        let result = {}
        result["auctionHouse_id"] = seller.dataValues.id
        result["auctionHouse_name"] = seller.dataValues.name
        result["auctionHouse_createdTime"] = seller.dataValues.createdAt
        result["auctionHouse_location"] = {"x": seller.dataValues.location.dataValues.x, "y": seller.dataValues.location.dataValues.y}
        if (seller.dataValues.reviews.length > 0) {
            result["auctionHouse_vote"] = seller.dataValues.reviews[0].avg_star;
        } else {
            result["auctionHouse_vote"] = 0;
        }
        

        logger.info(`${statusCode.HTTP_200_OK} [seller: ${seller.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(result)
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

        let seller = await _get_info_seller(req.params.user_id)

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


module.exports = {
    edit_profile,
    change_password,
    forgot_password,
    register,
    get_info_seller,
    get_seller_by_user_id,
};
