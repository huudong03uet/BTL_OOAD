const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')

const InspectionType = require("../../../constants/inspection")

const Product = require('../../models/product');
const Category = require('../../models/category');
const Image = require('../../models/image');
const Inspection = require('../../models/inspection');

const { check_required_field, delete_image, upload_image } = require('../util');
const { get_notifies, set_value_redis, get_value_redis, delete_key_redis } = require('../util/redis');
const { get_product, PRODUCT_INCLUDE } = require('./conponent');
const ProductService = require('./conponent');


// let get_all_product_not_inspect = async (req, res) => {
//     try {
//         let products = await get_product()

//         products = products.filter(product => !product.inspection);

//         logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Sold product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let product_inspect = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["admin_id", "description", "product_id", "status"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { admin_id, product_id } = req.body;

//         let existingInspection = await Inspection.findOne({
//             where: { product_id: product_id }
//         });

//         let status = InspectionType.DENIED

//         if (req.body.status === "Accept") {
//             status = InspectionType.INSPECTED
//         } 
    
//         if (existingInspection) {
//             await existingInspection.update({
//                 description: req.body.description,
//                 status: status,
//                 admin_id: admin_id,
//                 product_id: product_id
//             }, {
//                 transaction: t
//             });
//         } else {
//             existingInspection = await Inspection.create({
//                 description: req.body.description,
//                 status: status,
//                 admin_id: admin_id,
//                 product_id: product_id,
//             }, {
//                 transaction: t
//             });
//         }
    
//         const product = await Product.findByPk(product_id, { transaction: t });
//         if (product) {
//             await product.update({
//                 inspect_id: existingInspection.id
//             }, {
//                 transaction: t
//             });
//         } else {
//             throw new Error('Product not found');
//         }

//         let notifyValue = await get_value_redis(`notify:product:${product_id}`)
//         if (notifyValue) {
//             notifyValue.message = `New product ${product.title} has been ${req.body.status}`
//         } else {
//             notifyValue = {
//                 "message": `New product ${product.title} has been ${req.body.status}`,
//                 "date": Date.now(),
//                 "header": "Product",
//                 "image": 'https://via.placeholder.com/200',
//                 "product": product
//             };
//         }
//         set_value_redis(`seller:${product.seller_id}:product:${product.id}`, notifyValue)
//         await delete_key_redis(`notify:product:${product_id}`)

//         await t.commit();

//         logger.info(`${statusCode.HTTP_201_CREATED} product inspect done`)
//         return res.status(statusCode.HTTP_201_CREATED).json("Done");
//     } catch (error) {
//         await t.rollback();
//         logger.error(`Sold product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let get_all_product = async(req, res) => {
//     try {
//         let products = await get_product()

//         logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Sold product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let add_category = async (req, res) => {
//     const t = await sequelize.transaction();
//     let imageToDelete = "";
//     try {
//         if (!check_required_field(req.body, ["title"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const file = req.file;

//         if (file) {
//             const result = await upload_image(file.path.replace(/\\/g, '/'), "category");
//             imageToDelete = result.url;
//         } else {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         await Category.findOrCreate({
//             where: { title: req.body.title, image_path: imageToDelete },
//             transaction: t
//         });

//         await t.commit();

//         logger.info(`${statusCode.HTTP_201_CREATED} create category done`)
//         res.status(statusCode.HTTP_201_CREATED).json("done")
//     } catch (error) {
//         logger.error(`Add product: ${error}`)
//         await t.rollback();
//         try {
//             await delete_image(imageToDelete.split('/').slice(-2).join('/'));
//         } catch (deleteError) {
//             logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
//         }
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let delete_product = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["product_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const deletedProduct = await Product.destroy({
//             where: {
//                 id: req.params.product_id
//             }
//         });

//         if (deletedProduct === 0) {
//             logger.error(`${statusCode.HTTP_404_NOT_FOUND} Product not found.`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Product not found.");
//         }

//         return res.status(statusCode.HTTP_200_OK).json("Product deleted successfully.");
//     } catch (error) {
//         logger.error(`Add product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }



// let notify = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["admin_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const notifies = await get_notifies("admin", req.params.admin_id);

//         // logger.info(`${statusCode.HTTP_200_OK} notifies length ${notifies.length}`);
//         res.status(statusCode.HTTP_200_OK).json(notifies);
//     } catch (error) {
//         logger.error(`Add product: ${error}`)
//     }
// }

// let delete_category = async (req, res) => {
//     try {
//         const { category_id } = req.body;

//         const deletedCategory = await Category.destroy({
//             where: {
//                 id: category_id
//             }
//         });

//         if (deletedCategory === 0) {
//             logger.error(`${statusCode.HTTP_404_NOT_FOUND} Category not found.`);
//             return res.status(statusCode.HTTP_404_NOT_FOUND).json("Category not found.");
//         }

//         return res.status(statusCode.HTTP_200_OK).json("Category deleted successfully.");
//     } catch (error) {
//         logger.error(`Delete category: ${error}`);
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


class ProductController extends ProductService {
    service_product_not_inspect = async (req, res) => {
        try {
            let where_case = {
                ...this.where_case,
<<<<<<< HEAD
                inspect_id: {
                    [Op.is]: null
                }
=======
                inspect_id: null 
>>>>>>> 4b808ad02d66fab3e35069bda50f48eae18924d5
            };
    
            const products = await this.get_product(where_case)
            // let products = await get_product()
    
            // products = products.filter(product => !product.inspection);
    
            logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Sold product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    product_inspect = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            if (!check_required_field(req.body, ["admin_id", "description", "product_id", "status"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const { admin_id, product_id } = req.body;
    
            let inspection = await Inspection.findOne({
                where: { product_id: product_id }
            });
    
            let status = InspectionType.DENIED
    
            if (req.body.status === "Accept") {
                status = InspectionType.INSPECTED
            } 
        
            if (inspection) {
                await inspection.update({
                    description: req.body.description,
                    status: status,
                    admin_id: admin_id,
                    product_id: product_id
                }, {
                    transaction: t
                });
            } else {
                inspection = await Inspection.create({
                    description: req.body.description,
                    status: status,
                    admin_id: admin_id,
                    product_id: product_id,
                }, {
                    transaction: t
                });
            }
        
            const product = await Product.findByPk(product_id, { transaction: t });
            if (product) {
                await product.update({
                    inspect_id: inspection.id
                }, {
                    transaction: t
                });
            } else {
                throw new Error('Product not found');
            }
    
            let notifyValue = await get_value_redis(`notify:product:${product_id}`)
            if (notifyValue) {
                notifyValue.message = `New product ${product.title} has been ${req.body.status}`
            } else {
                notifyValue = {
                    "message": `New product ${product.title} has been ${req.body.status}`,
                    "date": Date.now(),
                    "header": "Product",
                    "image": 'https://via.placeholder.com/200',
                    "product": product
                };
            }
            set_value_redis(`seller:${product.seller_id}:product:${product.id}`, notifyValue)
            await delete_key_redis(`notify:product:${product_id}`)
    
            await t.commit();

            this.socket_product()
    
            logger.info(`${statusCode.HTTP_201_CREATED} product inspect done`)
            return res.status(statusCode.HTTP_201_CREATED).json("Done");
        } catch (error) {
            await t.rollback();
            logger.error(`Sold product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_all_product = async (req, res) => {
        try {
            let products = await this.get_product()
    
            logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Sold product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    add_category = async (req, res) => {
        const t = await sequelize.transaction();
        let imageToDelete = "";
        try {
            if (!check_required_field(req.body, ["title"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const file = req.file;
    
            if (file) {
                const result = await upload_image(file.path.replace(/\\/g, '/'), "category");
                imageToDelete = result.url;
            } else {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            await Category.findOrCreate({
                where: { title: req.body.title, image_path: imageToDelete },
                transaction: t
            });
    
            await t.commit();

            this.socket_product()
    
            logger.info(`${statusCode.HTTP_201_CREATED} create category done`)
            res.status(statusCode.HTTP_201_CREATED).json("done")
        } catch (error) {
            logger.error(`Add product: ${error}`)
            await t.rollback();
            try {
                await delete_image(imageToDelete.split('/').slice(-2).join('/'));
            } catch (deleteError) {
                logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
            }
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    notify = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["admin_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const notifies = await get_notifies("admin", req.params.admin_id);
    
            // logger.info(`${statusCode.HTTP_200_OK} notifies length ${notifies.length}`);
            res.status(statusCode.HTTP_200_OK).json(notifies);
        } catch (error) {
            logger.error(`Add product: ${error}`)
        }
    }

    delete_product = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["product_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const deletedProduct = await Product.destroy({
                where: {
                    id: req.params.product_id
                }
            });
    
            if (deletedProduct === 0) {
                logger.error(`${statusCode.HTTP_404_NOT_FOUND} Product not found.`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Product not found.");
            }
    
            return res.status(statusCode.HTTP_200_OK).json("Product deleted successfully.");
        } catch (error) {
            logger.error(`Add product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    delete_category = async (req, res) => {
        try {
            const { category_id } = req.body;
    
            const deletedCategory = await Category.destroy({
                where: {
                    id: category_id
                }
            });
    
            if (deletedCategory === 0) {
                logger.error(`${statusCode.HTTP_404_NOT_FOUND} Category not found.`);
                return res.status(statusCode.HTTP_404_NOT_FOUND).json("Category not found.");
            }
    
            return res.status(statusCode.HTTP_200_OK).json("Category deleted successfully.");
        } catch (error) {
            logger.error(`Delete category: ${error}`);
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}

module.exports = new ProductController()

// module.exports = {
//     get_all_product_not_inspect,
//     product_inspect,
//     get_all_product,
//     add_category,
//     delete_product,
//     notify,
//     delete_category,
// };

