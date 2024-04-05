const { DataTypes } = require("sequelize");

const sequelize = require("../../conf/sequelize");
const AuctionProductStatus = require('../../constants/auction_product_status')

const Category = require("./category");
const Seller = require("./seller");
const Auction = require("./auction");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_inspect: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "UNK",
  },
  max_estimate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  min_estimate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  numerical_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  auto_extend_time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: AuctionProductStatus.NOT_YET_SOLD,
  },
},
  {
    tableName: "product",
  }
);

Product.belongsTo(Seller, { foreignKey: "seller_id" });
Seller.hasMany(Product, { foreignKey: "seller_id" });

Product.belongsToMany(Category, { through: "Category_Product", foreignKey: "product_id" });
Category.belongsToMany(Product, { through: "Category_Product", foreignKey: "category_id" });

Product.belongsTo(Auction, { foreignKey: "auction_id" });
Auction.hasMany(Product, { foreignKey: "auction_id" });

module.exports = Product;
