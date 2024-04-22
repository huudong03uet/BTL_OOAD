const { Op } = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const Review = require('../../models/review');
const Seller = require('../../models/seller');

const { check_required_field } = require("../util");
const User = require('../../models/user');


let get_review = async (req, res) => {
    try {
        if (!check_required_field(req.params, ["seller_id"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }

        const seller_id = req.params.seller_id;

        const reviews = await Review.findAll({
            where: {
                seller_id: seller_id
            },
            include: [
                {
                    model: User,
                }
            ]
        });

        let reesult = []
        for (let review of reviews) {
            let out = {}
            out["id"] = review.id,
            out["vote"] = review.star,
            out["comment"] = review.comment,
            out["time_create"] = review.createdAt,
            out["user"] = {
                "user_id": review.user.id,
                "email": review.user.email,
                "first_name": review.user.first_name,
                "last_name": review.user.last_name,
                "user_name": review.user.user_name,
                "coin": review.user.coin,
                "phone": review.user.phone,
                "location_id": review.user.location_id,
            }
            reesult.push(out)
        }

        logger.info(`${statusCode.HTTP_200_OK} review length ${reviews.length}`)
        return res.status(statusCode.HTTP_200_OK).json(reesult);

    } catch (error) {
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


let set_review = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        if (!check_required_field(req.body, ["seller_id", "user_evaluate", "star", "comment"])) {
            logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
            return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
        }


        let [review, created] = await Review.findOrCreate({
            where: {
                seller_id: req.body.seller_id,
                user_evaluate: req.body.user_evaluate,
            },
            defaults: {
                star: req.body.star,
                comment: req.body.comment
            },
            transaction: t
        });

        if (!created) {
            await review.update({
                star: req.body.star,
                comment: req.body.comment
            }, { transaction: t });
        }

        await t.commit();


        logger.info(`${statusCode.HTTP_200_OK} [review: ${review.id}]`)
        return res.status(statusCode.HTTP_200_OK).json(review.id);
    } catch (error) {
        await t.rollback();
        logger.error(`Get Location: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}


module.exports = {
    get_review,
    set_review
};
