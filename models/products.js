// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");
const farmers = require("./farmers.js");
const {DataTypes} = require('sequelize')

// Creates a "products" model that matches up with DB
 var products = sequelize.define("products", {
    product_name: DataTypes.STRING,
    product_availability: DataTypes.BOOLEAN,
    farmers_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    }


  },{ timestamps: false});

  products.belongsTo(farmers,{
    foreignKey:"farmers_id"
  })

  


// Makes the products Model available for other files (will also create a table)
module.exports = products; 
