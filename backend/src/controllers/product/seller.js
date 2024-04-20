const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const sequelize = require('../../../conf/sequelize')
const logger = require('../../../conf/logger')
const statusCode = require('../../../constants/status')
const AuctionProductStatus = require('../../../constants/auction_product_status')

const Product = require('../../models/product');
const Image = require('../../models/image')
const Category = require('../../models/category');
const Seller = require('../../models/seller');

const { upload_image, delete_image, check_required_field } = require('../util');
const { delete_key_redis, set_value_redis, get_notifies } = require('../util/redis');
const { PRODUCT_INCLUDE, get_product } = require('./conponent');
const ProductService = require('./conponent');


// let add_product = async (req, res) => {
//     const t = await sequelize.transaction();
//     let imagesToDelete = [];
//     try {
//         if (!check_required_field(req.body, ["seller_id", "title", "description", "artist", "categories"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { seller_id, title, description, artist, categories, dimension, min_estimate, max_estimate, startBid, provenance } = req.body;
//         const images = await Promise.all(req.files.map(async file => {
//             const result = await upload_image(file.path.replace(/\\/g, '/'), "product");
//             imagesToDelete.push(result.url);
//             return {
//                 url: result.url,
//                 path: file.path.replace(/\\/g, '/')
//             }
//         }));


//         const seller = await Seller.findByPk(seller_id)

//         if (!seller) {
//             logger.error(`${statusCode.HTTP_403_FORBIDDEN} Không tìm thấy seller`);
//             return res.status(statusCode.HTTP_403_FORBIDDEN).json("Không tìm thấy seller")
//         }

//         const productData = {
//             "title": title,
//             "description": description,
//             "seller_id": seller.id,
//             // artist,
//             "artist": artist,
//             // dimension,
//             "dimension": dimension,
//             // min_estimate,
//             "min_estimate": min_estimate,
//             // max_estimate,
//             "max_estimate": max_estimate,
//             // startBid,
//             "startBid": startBid,
//             // provenance
//             "provenance": provenance
//         };

//         Object.keys(productData).forEach(key => productData[key] === undefined && delete productData[key]);

//         const product = await Product.create(productData, { transaction: t })
//         const arr_categories = JSON.parse(categories);
//         for (const category of arr_categories) {
//             const category_id = category.id;
//             const categoryInstance = await Category.findByPk(category_id);
//             if (!categoryInstance) {
//                 logger.error(`${statusCode.HTTP_404_NOT_FOUND} Category with ID ${category_id} not found`);
//                 await t.rollback();
//                 return res.status(statusCode.HTTP_404_NOT_FOUND).json(`Category with ID ${category_id} not found`);
//             }
//             await product.addCategory(categoryInstance, { transaction: t });
//         }

//         await Image.bulkCreate(images.map(image => ({
//             url: image.url,
//             path: image.path,
//             product_id: product.id
//         })), { transaction: t });

//         const notifyKey = `notify:product:${product.id}`;
//         const notifyValue = {
//             "message": `Seller ${seller.name} has created a new product ${title}`,
//             "date": Date.now(),
//             "header": "Product",
//             "image": images[0].url,
//             "product": product
//         };
//         set_value_redis(notifyKey, notifyValue);

//         await t.commit();

//         logger.info(`${statusCode.HTTP_201_CREATED} [product:${product.id}]`)
//         res.status(statusCode.HTTP_201_CREATED).json(product);
//     } catch (error) {
//         logger.error(`Add product: ${error}`)
//         await t.rollback();
//         for (const url of imagesToDelete) {
//             try {
//                 await delete_image(url.split('/').slice(-2).join('/'));
//             } catch (deleteError) {
//                 logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
//             }
//         }
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let update_product = async (req, res) => {
//     const t = await sequelize.transaction();
//     try {
//         if (!check_required_field(req.body, ["seller_id", "id", "title", "description", "artist", "category_name"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const { id, title, description, artist, category_name, dimension, min_estimate, max_estimate, provenance } = req.body;

//         const product = await Product.findByPk(id, {
//             where: {
//                 seller_id: req.body.seller_id
//             }
//         });

//         if (!product) {
//             logger.error(`${statusCode.HTTP_403_FORBIDDEN} Product not appect.`);
//             return res.status(statusCode.HTTP_403_FORBIDDEN).json("Product not appect.");
//         }

//         product.title = title;
//         product.description = description;
//         product.artist = artist;

//         if (dimension !== undefined) product.dimension = dimension;
//         if (min_estimate !== undefined) product.min_estimate = min_estimate;
//         if (max_estimate !== undefined) product.max_estimate = max_estimate;
//         if (provenance !== undefined) product.provenance = provenance;

//         if (category_name !== undefined) {
//             const [category, created] = await Category.findOrCreate({
//                 where: { title: category_name },
//                 transaction: t
//             });
//             await product.setCategories([category], { transaction: t });
//         }

//         await product.save({ transaction: t });
//         await t.commit();

//         await delete_key_redis(`${product.id}`)

//         logger.info(`${statusCode.HTTP_200_OK} [Product: ${id}]`)
//         res.status(statusCode.HTTP_200_OK).json(product);
//     } catch (error) {
//         logger.error(`Update product: ${error}`);
//         await t.rollback();
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


class ProductController extends ProductService {
    add_product = async (req, res) => {
        const t = await sequelize.transaction();
        let imagesToDelete = [];
        try {
            if (!check_required_field(req.body, ["seller_id", "title", "description", "artist", "categories"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const { seller_id, title, description, artist, categories, dimension, min_estimate, max_estimate, startBid, provenance } = req.body;
            const images = await Promise.all(req.files.map(async file => {
                const result = await upload_image(file.path.replace(/\\/g, '/'), "product");
                imagesToDelete.push(result.url);
                return {
                    url: result.url,
                    path: file.path.replace(/\\/g, '/')
                }
            }));
    
    
            const seller = await Seller.findByPk(seller_id)
    
            if (!seller) {
                logger.error(`${statusCode.HTTP_403_FORBIDDEN} Không tìm thấy seller`);
                return res.status(statusCode.HTTP_403_FORBIDDEN).json("Không tìm thấy seller")
            }
    
            const productData = {
                "title": title,
                "description": description,
                "seller_id": seller.id,
                // artist,
                "artist": artist,
                // dimension,
                "dimension": dimension,
                // min_estimate,
                "min_estimate": min_estimate,
                // max_estimate,
                "max_estimate": max_estimate,
                // startBid,
                "startBid": startBid,
                // provenance
                "provenance": provenance
            };
    
            Object.keys(productData).forEach(key => productData[key] === undefined && delete productData[key]);
    
            const product = await Product.create(productData, { transaction: t })
            const arr_categories = JSON.parse(categories);
            for (const category of arr_categories) {
                const category_id = category.id;
                const categoryInstance = await Category.findByPk(category_id);
                if (!categoryInstance) {
                    logger.error(`${statusCode.HTTP_404_NOT_FOUND} Category with ID ${category_id} not found`);
                    await t.rollback();
                    return res.status(statusCode.HTTP_404_NOT_FOUND).json(`Category with ID ${category_id} not found`);
                }
                await product.addCategory(categoryInstance, { transaction: t });
            }
    
            await Image.bulkCreate(images.map(image => ({
                url: image.url,
                path: image.path,
                product_id: product.id
            })), { transaction: t });
    
            const notifyKey = `notify:product:${product.id}`;
            const notifyValue = {
                "message": `Seller ${seller.name} has created a new product ${title}`,
                "date": Date.now(),
                "header": "Product",
                "image": images[0].url,
                "product": product
            };
            set_value_redis(notifyKey, notifyValue);
    
            await t.commit();

            this.socket_product()
    
            logger.info(`${statusCode.HTTP_201_CREATED} [product:${product.id}]`)
            res.status(statusCode.HTTP_201_CREATED).json(product);
        } catch (error) {
            logger.error(`Add product: ${error}`)
            await t.rollback();
            for (const url of imagesToDelete) {
                try {
                    await delete_image(url.split('/').slice(-2).join('/'));
                } catch (deleteError) {
                    logger.error(`Error deleting image from Cloudinary: ${deleteError}`);
                }
            }
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    update_product = async (req, res) => {
        const t = await sequelize.transaction();
        try {
            if (!check_required_field(req.body, ["seller_id", "id", "title", "description", "artist", "category_name"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const { id, title, description, artist, category_name, dimension, min_estimate, max_estimate, provenance } = req.body;
    
            const product = await Product.findByPk(id, {
                where: {
                    seller_id: req.body.seller_id
                }
            });
    
            if (!product) {
                logger.error(`${statusCode.HTTP_403_FORBIDDEN} Product not appect.`);
                return res.status(statusCode.HTTP_403_FORBIDDEN).json("Product not appect.");
            } else if (!product.inspect_id) {
                logger.error(`${statusCode.HTTP_406_NOT_ACCEPTABLE} Product edit not accept.`);
                return res.status(statusCode.HTTP_406_NOT_ACCEPTABLE).json("Product edit not accept.");
            }
    
            product.title = title;
            product.description = description;
            product.artist = artist;
    
            if (dimension !== undefined) product.dimension = dimension;
            if (min_estimate !== undefined) product.min_estimate = min_estimate;
            if (max_estimate !== undefined) product.max_estimate = max_estimate;
            if (provenance !== undefined) product.provenance = provenance;
    
            if (category_name !== undefined) {
                const [category, created] = await Category.findOrCreate({
                    where: { title: category_name },
                    transaction: t
                });
                await product.setCategories([category], { transaction: t });
            }
    
            await product.save({ transaction: t });
            await t.commit();

            this.socket_product()
    
            await delete_key_redis(`${product.id}`)
    
            logger.info(`${statusCode.HTTP_200_OK} [Product: ${id}]`)
            res.status(statusCode.HTTP_200_OK).json(product);
        } catch (error) {
            logger.error(`Update product: ${error}`);
            await t.rollback();
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }


    service_product_sold = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id,
                status: AuctionProductStatus.SOLD,
            };
    
            const products = await this.get_product(where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} products sold length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Sold product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_products = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id,
            };
    
            const products = await this.get_product(where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Get product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    service_product_history = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            let where_case = {
                ...this.where_case,
                seller_id: req.params.seller_id,
                status: AuctionProductStatus.SOLD,
            };
    
            // let productIncludes = PRODUCT_INCLUDE.map(include => {
            //     if (include.model === Winner) {
            //         return {
            //             ...include,
            //             required: true
            //         };
            //     }
            //     return include;
            // })
    
            let products = await this.get_product(where_case)
    
            logger.info(`${statusCode.HTTP_200_OK} products history length ${products.length}`)
            return res.status(statusCode.HTTP_200_OK).json(products);
        } catch (error) {
            logger.error(`Sold product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    notify = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["seller_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }
    
            const notifies = await get_notifies(`seller:${req.params.seller_id}:*`);
    
            res.status(statusCode.HTTP_200_OK).json(notifies);
        } catch (error) {
            logger.error(`Add product: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }
}

module.exports = new ProductController()

// let get_product_sold = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id,
//             status: AuctionProductStatus.SOLD,
//         };

//         let productIncludes = PRODUCT_INCLUDE.map(include => {
//             if (include.model === Winner) {
//                 return {
//                     ...include,
//                     required: true
//                 };
//             }
//             return include;
//         })

//         const products = await get_product(whereCondition, productIncludes)

//         logger.info(`${statusCode.HTTP_200_OK} products sold length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Sold product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let get_products = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             seller_id: req.params.seller_id
//         };

//         let products = await get_product(whereCondition)

//         logger.info(`${statusCode.HTTP_200_OK} products length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Get product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }

// let get_product_history = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         let whereCondition = {
//             status: AuctionProductStatus.SOLD,
//             seller_id: req.params.seller_id
//         };

//         let productIncludes = PRODUCT_INCLUDE.map(include => {
//             if (include.model === Winner) {
//                 return {
//                     ...include,
//                     required: true
//                 };
//             }
//             return include;
//         })

//         let products = await get_product(whereCondition, productIncludes)

//         logger.info(`${statusCode.HTTP_200_OK} products history length ${products.length}`)
//         return res.status(statusCode.HTTP_200_OK).json(products);
//     } catch (error) {
//         logger.error(`Sold product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// let notify = async (req, res) => {
//     try {
//         if (!check_required_field(req.params, ["seller_id"])) {
//             logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
//             return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
//         }

//         const notifies = await get_notifies(`seller:${req.params.seller_id}:*`);

//         res.status(statusCode.HTTP_200_OK).json(notifies);
//     } catch (error) {
//         logger.error(`Add product: ${error}`)
//         return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
//     }
// }


// module.exports = {
//     add_product,
//     get_product_sold,
//     update_product,
//     get_products,
//     get_product_history,
//     notify
// };
