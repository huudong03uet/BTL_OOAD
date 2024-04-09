const { DataTypes } = require("sequelize");

const sequelize = require("../../conf/sequelize");
const AuctionProductStatus = require('../../constants/auction_product_status')
const AuctionProductVisibilityStatus = require('../../constants/product_visibility')

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
    type: DataTypes.ENUM,
    allowNull: false,
    values: [AuctionProductStatus.NOT_YET_SOLD, AuctionProductStatus.ON_SALE, AuctionProductStatus.SOLD],
    defaultValue: AuctionProductStatus.NOT_YET_SOLD,
  },
  visibility: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: [AuctionProductVisibilityStatus.PUBLIC, AuctionProductVisibilityStatus.PRIVATE],
    defaultValue: AuctionProductVisibilityStatus.PUBLIC,
  },
  condition_report: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "All items sold 'As Is'. Authenticity guaranteed, but grade and condition not. Use pictures for your judgment",
  }
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
