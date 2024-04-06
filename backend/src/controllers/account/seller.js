const Card = require('../../models/card');
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
        const user_id = req.body.user_id;
        const {name, email, phone, desciption} = req.body.seller_info;
        const {id, expiry, cvn, name_card } = req.body.card_info;
        const {country, address, city, state, postal} = req.body.location_info;

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


module.exports = {
    edit_profile,
    change_password,
    forgot_password,
    register,
};
