const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const statusCode = require('../../../constants/status');
const Card = require('../../models/card');
const Seller = require('../../models/seller');
const User = require('../../models/user');
const { find_or_create_location } = require('../conponent/location');


let register = async (req, res) => {
    const t = await sequelize.transaction();
    try {
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


module.exports = { register }
