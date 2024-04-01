const sequelize = require('../../../conf/sequelize');
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")

const InspectionType = require("../../../constants/inspection")
const UserInvitationStatus = require("../../../constants/user_invitation")
const ProductInvitationStatus = require("../../../constants/product_invitation")
const AuctionRoomRequestStatus = require("../../../constants/auction_room_request_status")

const AuctionRoomRequest = require('../../models/auction_room_request');
const InvitationUser = require('../../models/invitation_user');
const InvitationProduct = require('../../models/invitation_product');
const Product = require('../../models/product');
const Seller = require('../../models/seller');
const BidHistory = require('../../models/history_bid');
const AuctionRoomProduct = require('../../models/auction_room_product');
const CoinHistory = require('../../models/history_coin');
const Inspection = require('../../models/inspection');
const AuctionRoom = require('../../models/auction_room');


let get_notification = async (req, res) => {
    try {
        let role_id = req.params.role_id;
        let role_type = req.params.role_type;

        let notifies = []

        if (role_type == "admin") {
            let auction_room_requests = await AuctionRoomRequest.findAll({
                where: {
                    status: AuctionRoomRequestStatus.NOT_YET
                }
            });

            auction_room_requests.forEach(request => {
                notifies.push({
                    id: request.id,
                    message: `New auction room request: ${request.description}`,
                    type: "new_aution",
                    createdAt: request.createdAt,
                });
            });

            let inspections = await Inspection.findAll({
                where: {
                    status: InspectionType.NOT_INSPECT,
                }
            });

            inspections.forEach(inspect => {
                notifies.push({
                    id: inspect.id,
                    message: `New inspection request: ${inspect.name}, coin: ${inspect.coin} description: ${inspect.description}`,
                    type: "inspection",
                    createdAt: inspect.createdAt,
                });
            });
        } else {
            let invite_user = await InvitationUser.findAll({
                where: {
                    status: UserInvitationStatus.NOT_YET,
                    user_id: role_id,
                    view: false
                },
                include: [
                    {
                        model: Seller,
                        attributes: ["name"]
                    },
                    {
                        model: AuctionRoom,
                        attributes: ["name"]
                    }
                ]
            });

            invite_user.forEach(invite => {
                notifies.push({
                    id: invite.id,
                    message: `New auction invitation from seller: ${invite.Seller.name}`,
                    type: "invite_user",
                    createdAt: request.createdAt,
                });
            });

            let invate_products = await InvitationProduct.findAll({
                where: {
                    status: ProductInvitationStatus.NOT_YET,
                    view: false
                },
                include: {
                    model: Product,
                    where: { owner_id: role_id, }
                }
            });

            invate_products.forEach(invite => {
                notifies.push({
                    id: invite.id,
                    message: `New product invitation: ${invite.Product.title} ${invite.Product.artist} ${invite.Product.description}`,
                    type: "invite_product",
                    createdAt: request.createdAt,
                });
            });

            let seller = await Seller.findOne({ where: { user_id: role_id } })

            let bid_histories = await BidHistory.findAll({
                where: {
                    view: false
                },
                include: {
                    model: AuctionRoomProduct,
                    where: { seller_id: seller.id, }
                }
            })

            bid_histories.forEach(history => {
                notifies.push({
                    id: history.id,
                    message: `New bid: ${history.description} ${history.amount}`,
                    type: "history_bid",
                    createdAt: request.createdAt,
                });
            });

            let coin_histories = await CoinHistory.findAll({
                where: {
                    user_id: role_id,
                    view: false
                }
            })

            coin_histories.forEach(history => {
                notifies.push({
                    id: history.id,
                    message: `New coin transaction: ${history.description} ${history.amount} ${history.type}`,
                    type: "history_coin",
                    createdAt: request.createdAt,
                });
            });
        }

        return res.status(statusCode.HTTP_200_OK).json(notifies);
    } catch (error) {
        logger.error(`Get Notification: ${error}`)
        return res.status(statusCode.HTTP_408_REQUEST_TIMEOUT).json("TIME OUT");
    }
}

module.exports = { get_notification }
