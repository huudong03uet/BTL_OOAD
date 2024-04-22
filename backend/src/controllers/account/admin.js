const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const statusCode = require('../../../constants/status');
const User = require('../../models/user');
const Seller = require('../../models/seller');
const Admin = require('../../models/admin');
const ProfileService = require('./role');
const Card = require('../../models/card');
const Location = require('../../models/location');


// let user_manager = async (req, res) => {
//     try {
//         let users = await User.findAll()

//         logger.info(`${statusCode.HTTP_200_OK} user length ${users.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(users);
//     } catch (error) {
//         logger.error(`Auction get history: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let seller_manager = async (req, res) => {
//     try {
//         let sellers = await Seller.findAll()

//         logger.info(`${statusCode.HTTP_200_OK} sellers length ${sellers.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(sellers);
//     } catch (error) {
//         logger.error(`Auction get history: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

class ProfileController extends ProfileService {
    constructor() {
        super(Admin);
    }

    get_role_data(dict) {
        return {
            "phone": dict.admin.phone,
            "email": dict.admin.email,
            "last_name": dict.admin.last_name,
            "first_name": dict.admin.first_name,
            "avatar_path": this.imageToDelete || "https://via.placeholder.com/150",
        }
    }

    user_manager = async (req, res) => {
        try {
            let users = await User.findAll(
                {
                    
                include: [
                    {
                        model: Card
                    },
                    {
                        model: Location
                    }
                ]
                }
            )

            logger.info(`${statusCode.HTTP_200_OK} user length ${users.length}`)
            return res.status(statusCode.HTTP_200_OK).json(users);
        } catch (error) {
            logger.error(`Auction get history: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    seller_manager = async (req, res) => {
        try {
            let sellers = await Seller.findAll({

                include: [
                    {
                        model: Card
                    },
                    {
                        model: Location
                    }
                ]
            })

            logger.info(`${statusCode.HTTP_200_OK} sellers length ${sellers.length}`)
            return res.status(statusCode.HTTP_200_OK).json(sellers);
        } catch (error) {
            logger.error(`Auction get history: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}

module.exports = new ProfileController()
// module.exports = { 
//     user_manager,
//     seller_manager
// }

