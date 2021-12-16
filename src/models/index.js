const Sequelize = require("sequelize");
const db = new Sequelize({
  database: "storedb",
  username: "storeuser",
  password: "storepass",
  dialect: "mysql",
});

const Users = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
});

const Products = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(20, 2),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  img: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    allowNull: false,
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

const Colors = db.define("color", {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Sizes = db.define("size", {
  value: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Colors.belongsToMany(Products, { through: "ProductColor" });
Products.belongsToMany(Colors, { through: "ProductColor" });

Sizes.belongsToMany(Products, { through: "ProductSize" });
Products.belongsToMany(Sizes, { through: "ProductSize" });

module.exports = { db, Users, Products, Sizes, Colors };
