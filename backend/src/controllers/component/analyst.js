const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const logger = require('../../../conf/logger');
const sequelize = require('../../../conf/sequelize');
const AuctionProductStatus = require('../../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../../constants/product_visibility')
const statusCode = require('../../../constants/status');

const Auction = require('../../models/auction');
const Product = require('../../models/product');
const User = require('../../models/user');
const Seller = require('../../models/seller');


class Analystic {
    constructor() {
    }


    analyst_total = async(req, res) => {
        try {
            let product_total = await this.product()
            let auction_total = await this.auction()
            let user_total = await this.user()
            let seller_total = await this.seller()
    
            return res.status(statusCode.HTTP_200_OK).json({
                "totalProduct": product_total,
                "totalAuction": auction_total,
                "totalUsers": user_total,
                "totalSeller": seller_total,
            })
        } catch (error) {
            logger.error(`Get Location: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    analyst_year = async () => {
        try {
            let yearData = {};

            for (let month = 1; month <= 12; month++) {
                let monthData = {};

                let soldCount = await this.product({
                    updatedAt: {
                        [Op.between]: [
                            new Date(new Date().getFullYear(), month, 1),
                            new Date(new Date().getFullYear(), month + 1, 1)
                        ]
                    },
                    status: 'sold'
                });
            
                let newCount = await this.product({
                    createdAt: {
                        [Op.between]: [
                            new Date(new Date().getFullYear(), month, 1),
                            new Date(new Date().getFullYear(), month + 1, 1)
                        ]
                    }
                });

                monthData = {
                    "productNew": newCount,
                    "productSell": soldCount,
                };

                switch (month) {
                    case 1:
                        yearData["totalJan"] = monthData;
                        break;
                    case 2:
                        yearData["totalFeb"] = monthData;
                        break;
                    case 3:
                        yearData["totalMar"] = monthData;
                        break;
                    case 4:
                        yearData["totalApr"] = monthData;
                        break;
                    case 5:
                        yearData["totalMay"] = monthData;
                        break;
                    case 6:
                        yearData["totalJun"] = monthData;
                        break;
                    case 7:
                        yearData["totalJul"] = monthData;
                        break;
                    case 8:
                        yearData["totalAug"] = monthData;
                        break;
                    case 9:
                        yearData["totalSep"] = monthData;
                        break;
                    case 10:
                        yearData["totalOct"] = monthData;
                        break;
                    case 11:
                        yearData["totalNov"] = monthData;
                        break;
                    case 12:
                        yearData["totalDec"] = monthData;
                        break;
                    default:
                        break;
                }
            }

            return yearData;
        } catch (error) {
            console.error("Lỗi khi thực hiện phân tích sản phẩm:", error);
            throw error;
        }
    }

    analyst_month = async () => {
        try {
            let weekData = {};

            for (let week = 1; week <= 4; week++) {
                let currentDate = new Date();
                let currentYear = currentDate.getFullYear();
                let currentMonth = currentDate.getMonth();

                let monthStart = new Date(currentYear, currentMonth, 1 + (week - 1) * 7);
                let monthEnd = new Date(currentYear, currentMonth , week * 7); 

                let weekCountSold = await this.product({
                    updatedAt: {
                        [Op.between]: [
                            monthStart,
                            monthEnd
                        ]
                    },
                    status: 'sold'
                });

                let weekCountNew = await this.product({
                    createdAt: {
                        [Op.between]: [
                            monthStart,
                            monthEnd
                        ]
                    },
                });

                let monthData = {
                    "productNew": weekCountNew,
                    "productSell": weekCountSold,
                };


                switch (week) {
                    case 1:
                        weekData["totalWeek1"] = monthData;
                        break;
                    case 2:
                        weekData["totalWeek2"] = monthData;
                        break;
                    case 3:
                        weekData["totalWeek3"] = monthData;
                        break;
                    case 4:
                        weekData["totalWeek4"] = monthData;
                        break;
                    default:
                        break;
                }
            }

            return weekData;
        } catch (error) {
            console.error("Lỗi khi thực hiện phân tích sản phẩm:", error);
            throw error;
        }
    }

    analyst_week = async () => {
        try {
            let weekData = {};

            for (let day = 1; day <= 7; day++) {
                let currentDate = new Date();

                let startDate = new Date(currentDate);
                startDate.setDate(currentDate.getDate() - day);
                let endDate = currentDate.setDate(currentDate.getDate() - day + 1);

                let weekCountSold = await this.product({
                    updatedAt: {
                        [Op.between]: [
                            startDate,
                            endDate
                        ]
                    },
                    status: 'sold'
                });

                let weekCountNew = await this.product({
                    createdAt: {
                        [Op.between]: [
                            startDate,
                            endDate
                        ]
                    },
                });

                let monthData = {
                    "productNew": weekCountNew,
                    "productSell": weekCountSold,
                };


                switch (day) {
                    case 1:
                        weekData["totalSunday"] = monthData;
                        break;
                    case 2:
                        weekData["totalSaturday"] = monthData;
                        break;
                    case 3:
                        weekData["totalFriday"] = monthData;
                        break;
                    case 4:
                        weekData["totalThursday"] = monthData;
                        break;
                    case 5:
                        weekData["totalWednesday"] = monthData;
                        break;
                    case 6:
                        weekData["totalTuesday"] = monthData;
                        break;
                    case 7:
                        weekData["totalMonday"] = monthData;
                        break;
                    default:
                        break;
                }
            }

            return weekData;
        } catch (error) {
            console.error("Lỗi khi thực hiện phân tích sản phẩm:", error);
            throw error;
        }
    }

    analyst_product_filter = async (req, res) => {
        try {
            let year = await this.analyst_year()
            let month = await this.analyst_month()
            let week = await this.analyst_week()

            return res.status(statusCode.HTTP_200_OK).json({
                "totalProductYear": year,
                "totalProductMonth": month,
                "totalProductWeek": week,
            })
        } catch (error) {
            logger.error(`Get Location: ${error}`)
            return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
        }
    }

    auction = async (where_case = {}) => {
        try {
            let auction_count = await Auction.count({
                where: where_case
            });
            console.log("Số lượng auction:", auction_count);
            return auction_count;
        } catch (error) {
            console.error("Lỗi khi đếm auction:", error);
            throw error;
        }
    }

    product = async (where_case = {}) => {
        try {
            let product_count = await Product.count({
                where: where_case
            });
            console.log("Số lượng product:", product_count);
            return product_count;
        } catch (error) {
            console.error("Lỗi khi đếm product:", error);
            throw error;
        }
    }

    user = async (where_case = {}) => {
        try {
            let user_count = await User.count({
                where: where_case
            });
            console.log("Số lượng user:", user_count);
            return user_count;
        } catch (error) {
            console.error("Lỗi khi đếm user:", error);
            throw error;
        }
    }

    seller = async (where_case = {}) => {
        try {
            let seller_count = await Seller.count({
                where: where_case
            });
            console.log("Số lượng seller:", seller_count);
            return seller_count;
        } catch (error) {
            console.error("Lỗi khi đếm seller:", error);
            throw error;
        }
    }
}


module.exports = new Analystic()
