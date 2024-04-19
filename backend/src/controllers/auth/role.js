const { Op } = require('sequelize');
const statusCode = require('../../../constants/status');
const logger = require("../../../conf/logger");
const { hash_password, compare_password, check_required_field } = require('../util');

// async function role_login(req, res, Model) {
//     try {
//         if (!check_required_field(req.body, [`${Model.name.toLowerCase()}_name`, "password"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const role_name = req.body[`${Model.name.toLowerCase()}_name`]
//         const password = req.body.password;

//         const account = await Model.findOne({
//             where: {
//                 [Op.or]: [
//                     { email: role_name },
//                     { [`${Model.name.toLowerCase()}_name`]: role_name },
//                 ],
//             },
//         });

//         if (!account) {
//             logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Account not found.`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Account not found.");
//         }
        
//         const result = await compare_password(password, account.password);

//         if (result) {
//             logger.info(`${statusCode.HTTP_200_OK} [${Model.name.toLowerCase()}:${account.id}]`);
//             return res.status(statusCode.HTTP_200_OK).json(account);
//         }

//         logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Incorrect password.`);
//         return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Incorrect password.");
//     } catch (error) {
//         logger.error(`Login: ${error}`);
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// async function role_sign_up(req, res, Model) {
//     try {
//         if (!check_required_field(req.body, ["first_name", "last_name", `${Model.name.toLowerCase()}_name`, "email", "password"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const first_name = req.body.first_name;
//         const last_name = req.body.last_name;
//         const password = req.body.password;
//         const email = req.body.email;
//         const role_name = req.body[`${Model.name.toLowerCase()}_name`]
        

//         const existingAccountByEmail = await Model.findOne({
//             where: { email: email },
//         });

//         const existingAccountByUsername = await Model.findOne({
//             where: { [`${Model.name.toLowerCase()}_name`]: role_name },
//         });

//         if (existingAccountByEmail) {
//             logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Email already exists in the system.`);
//             return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Email already exists in the system.');
//         }

//         if (existingAccountByUsername) {
//             logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Username already exists in the system.`);
//             return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Username already exists in the system.');
//         }

//         const { success, hashedPassword } = await hash_password(password);

//         if (success) {
//             const newAccount = await Model.create({
//                 [`${Model.name.toLowerCase()}_name`]: role_name,
//                 first_name: first_name,
//                 last_name: last_name,
//                 email: email,
//                 password: hashedPassword,
//             });
//             newAccount.password = undefined;

//             logger.info(`${statusCode.HTTP_201_CREATED} [${Model.name.toLowerCase()}:${newAccount.id}]`);
//             return res.status(statusCode.HTTP_201_CREATED).json(newAccount);
//         }

//         logger.error(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [${Model.name.toLowerCase()}]`);
//         return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json(`Error creating ${Model.name.toLowerCase()}.`);
//     } catch (error) {
//         logger.error(`Sign up: ${error}`);
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


class Authentification {
    constructor(model) {
        this.model = model
    }

    login = async (req, res) => {
        try {
            console.log(this);
            if (!check_required_field(req.body, [`${this.model.name.toLowerCase()}_name`, "password"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const role_name = req.body[`${this.model.name.toLowerCase()}_name`]
            const password = req.body.password;
    
            const account = await this.model.findOne({
                where: {
                    [Op.or]: [
                        { email: role_name },
                        { [`${this.model.name.toLowerCase()}_name`]: role_name },
                    ],
                },
            });
    
            if (!account) {
                logger.warn(`${statusCode.HTTP_404_NOT_FOUND} Account not found.`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Account not found.");
            }
            
            const result = await compare_password(password, account.password);
    
            if (result) {
                logger.info(`${statusCode.HTTP_200_OK} [${this.model.name.toLowerCase()}:${account.id}]`);
                return res.status(statusCode.HTTP_200_OK).json(account);
            }
    
            logger.warn(`${statusCode.HTTP_401_UNAUTHORIZED} Incorrect password.`);
            return res.status(statusCode.HTTP_401_UNAUTHORIZED).json("Incorrect password.");
        } catch (error) {
            logger.error(`Login: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    sign_up = async (req, res) => {
        try {
            if (!check_required_field(req.body, ["first_name", "last_name", `${this.model.name.toLowerCase()}_name`, "email", "password"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const password = req.body.password;
            const email = req.body.email;
            const role_name = req.body[`${this.model.name.toLowerCase()}_name`]
            
    
            const existingAccountByEmail = await this.model.findOne({
                where: { email: email },
            });
    
            const existingAccountByUsername = await this.model.findOne({
                where: { [`${this.model.name.toLowerCase()}_name`]: role_name },
            });
    
            if (existingAccountByEmail) {
                logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Email already exists in the system.`);
                return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Email already exists in the system.');
            }
    
            if (existingAccountByUsername) {
                logger.warn(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Username already exists in the system.`);
                return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json('Username already exists in the system.');
            }
    
            const { success, hashedPassword } = await hash_password(password);
    
            if (success) {
                const newAccount = await this.model.create({
                    [`${this.model.name.toLowerCase()}_name`]: role_name,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                });
                newAccount.password = undefined;
    
                logger.info(`${statusCode.HTTP_201_CREATED} [${this.model.name.toLowerCase()}:${newAccount.id}]`);
                return res.status(statusCode.HTTP_201_CREATED).json(newAccount);
            }
    
            logger.error(`${statusCode.HTTP_406_NOT_ACCEPTABLE} [${this.model.name.toLowerCase()}]`);
            return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json(`Error creating ${this.model.name.toLowerCase()}.`);
        } catch (error) {
            logger.error(`Sign up: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}

module.exports = Authentification;

// module.exports = {
//     role_login,
//     role_sign_up,
// };
