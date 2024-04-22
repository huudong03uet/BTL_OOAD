const { DOUBLE } = require('sequelize');
const User = require('../../models/user');
const { role_edit_profile, role_change_password, role_forgot_password } = require('./role');
const ProfileService = require('./role');
const CoinHistory = require('../../models/history_coin');
// import CoinHistory from '../../models/history_coin';
const { check_required_field } = require('../util');
const CoinHistoryType = require("../../../constants/coin_history")
const statusCode = require('../../../constants/status')
const logger = require("../../../conf/logger")


const stripe = require('stripe')('sk_test_51P7bjf05CJZ8qs7kDcGSebDhXZPJ7VpPLceToyYQ7PQzfzYrwZqI8wuvfqBNDZeZ8wwlW07NFRO1CGza2softbc500Fz4T8jv6');
// const edit_profile = async (req, res) => {
//     return await role_edit_profile(req, res, User)
// }


// const change_password = async(req, res) => {
//     return await role_change_password(req, res, User)
// }


// let forgot_password = async (req, res) => {
//     return await role_forgot_password(req, res, User)
// }

// let qr_payment = async (req, res) => {
//     const { user_id, amount } = req.body;

//     try {
//         const user = await User.findByPk(user_id);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         console.log(user_id, amount);

//         user.coin += parseFloat(amount);

//         await user.save();

//         return res.status(200).json({ message: 'Payment successful', user });
//     } catch (error) {
//         console.error('Error while processing payment:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };


class ProfileController extends ProfileService {
    constructor() {
        super(User);
    }

    get_role_data(dict) {
        console.log(this.imageToDelete)
        return {
            "phone": dict.user.phone,
            "email": dict.user.email,
            "last_name": dict.user.last_name,
            "first_name": dict.user.first_name,
            "avatar_path": this.imageToDelete || "https://via.placeholder.com/150",
        }
    }

    qr_payment = async (req, res) => {
        const { user_id, amount } = req.body;
    
        try {
            const user = await User.findByPk(user_id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Tạo một bản ghi mới trong bảng coin_history
            await CoinHistory.create({
                user_id,
                description: 'QR payment', // Mô tả thanh toán
                amount: parseFloat(amount),
                type: CoinHistoryType.DEPOSIT // Loại thanh toán (nạp tiền)
            });
    
            // Cập nhật số tiền của người dùng
            user.coin += parseFloat(amount);
            await user.save();
    
            return res.status(200).json({ message: 'Payment successful', user });
        } catch (error) {
            console.error('Error while processing payment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };


    get_user_by_user_id = async (req, res) => {
        try {
            if (!check_required_field(req.params, ["user_id"])) {
                logger.error(`${statusCode.HTTP_400_BAD_REQUEST} Missing required fields.`);
                return res.status(statusCode.HTTP_400_BAD_REQUEST).json("Missing required fields.");
            }

            let user = await User.findByPk(req.params.user_id)
            logger.info(`${statusCode.HTTP_200_OK} [user: ${user.id}]`)
            return res.status(statusCode.HTTP_200_OK).json(user)
        }  catch (error) {
            logger.error('Error while processing payment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    


    cardPayment = async (req, res) => {
        const product = await stripe.products.create({
            name: 'Hãy nhập số tiền bạn muốn nạp vào tài khoản',
          });
          
        const price = await stripe.prices.create({
            currency: 'vnd',
            custom_unit_amount: {
              enabled: true,
              preset: 20000,
              minimum: 20000,
            },
            product: product.id,
          });
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay', // Set submit type to 'donate' for custom amounts
            payment_method_types: ['card'],
            // business: {name: 'Auction'},
            line_items: [
                {
                  price: price.id,
                  quantity: 1,
                },
              ],            
            mode: 'payment', 
            success_url: `http://localhost:3000/my-account/payment-options?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000`,
        })
        res.send({url: session.url});
    }

    handleCardPayment = async (req, res) => {
        const { sessionId, user_id } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        try {
            const user = await User.findByPk(user_id);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Kiểm tra xem có thông tin thanh toán của session trước đó hay không
            const previousPayment = await CoinHistory.findOne({
                where: {
                    user_id,
                    description: sessionId // Kiểm tra sessionId trong trường description
                }
            });
            let previous = false;
            // Nếu không tìm thấy thông tin thanh toán trước đó, tiến hành lưu thông tin thanh toán
            if (!previousPayment) {
                // Lưu thông tin thanh toán vào bảng CoinHistory
                await CoinHistory.create({
                    user_id,
                    description: sessionId,
                    amount: session.amount_total,
                    type: CoinHistoryType.DEPOSIT,
                });
    
                // Cập nhật số tiền của người dùng
                user.coin += session.amount_total;
                await user.save();
            } else {
                previous = true;
            }
    
            return res.status(200).json({ message: 'Payment successful', user, amount: session.amount_total, previous});
        } catch (error) {
            console.error('Error while processing payment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}    


module.exports = new ProfileController()

// module.exports = {
//     edit_profile,
//     change_password,
//     forgot_password,
//     qr_payment
// };
