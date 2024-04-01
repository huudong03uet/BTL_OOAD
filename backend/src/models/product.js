const { DataTypes } = require("sequelize");

const sequelize = require("../../conf/sequelize");
const ProductStatus = require("../../constants/product_status");
const User = require("./user");
const Category = require("./category");

const Product = sequelize.define(
  "product",
  {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ProductStatus.NOT_INSPECT,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "UNK",
    },
  },
  {
    tableName: "product",
  }
);

Product.belongsTo(User, { foreignKey: "owner_id" });
User.hasMany(Product, { foreignKey: "owner_id" });

Product.belongsToMany(Category, {
  through: "Category_Product",
  foreignKey: "product_id",
});
Category.belongsToMany(Product, {
  through: "Category_Product",
  foreignKey: "category_id",
});

module.exports = Product;
