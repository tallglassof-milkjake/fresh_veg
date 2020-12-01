// Dependencies
// =======================================================================
const express = require("express");

const router = express.Router();

const db = require("../models");

const {rando, randoSequence} = require('@nastyox/rando.js');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
// *********************************************************************************
// html-routes.js - this section offers a set of routes for sending users to the various html pages
// *********************************************************************************
// route for an individual farmer's page
const { Op } = require("sequelize");
const products = require("../models/products");
const { resolve } = require("path");
const farmers = require("../models/farmers");

router.get("/", (req, res) =>{
    const products = db.products.findAll();
     
       db.products.findAll().then(function(data) {
      
               let hdbrsObj = {
                products: data
               };
               res.render("vege", hdbrsObj);
             });
});
 // route for an individual farmer's page
 router.get("/farmer", (req, res) =>{   
     

 

    db.farmers.findAll( ).then(function(data) {
        // for each farmer get the product (better to do it as join)



         /*   let vegeArray = [{farmers:data, products:(products)}];
           console.log(vegeArray); */

    
          
           
           let hdbrsObj = {
              farmers: data,
            
            };


            res.render("index", hdbrsObj);
          });
    });

router.get("/addvege", (req, res) => {
    try {

        db.farmers.findAll().then(function(data) {
            let handlebarsObj = {
                farmers: data,
            }

            res.render("addvege", handlebarsObj);
        })
        
    } catch(error) {
        res.status(500).send('Error, something is not working please try again.')
    }
});

router.get("/profile", (req, res) => {
    try{
        db.products.belongsTo(db.farmers, {foreignKey: 'farmers_id'});
        db.farmers.hasMany(db.products, {foreignKey: 'farmers_id'});
        

        db.products.findOne({
            where: { farmers_id: 3},
            include: [
                {
                    model: db.farmers,
                    include: [
                        {
                            model: db.products
                        }
                    ]
                }
            ]
        }).then(data => {
            let myProduce = JSON.stringify(data);
            let newProd = JSON.parse(myProduce);
            
            let prodObj = Object.assign({}, [newProd]);
            
            ;

            let handlebarsObj = {
                products: data
            }

            console.log(data)

            let prodStr = JSON.stringify(prodObj);
            res.render("profile", handlebarsObj);

        })

        // res.render("profile", newObj)
        // User.hasMany(Post, {foreignKey: 'user_id'})
        // Post.belongsTo(User, {foreignKey: 'user_id'})

        // Post.find({ where: { ...}, include: [User]})
    } catch(error) {
        res.status(500).send('Error, something is not working please try again.')
    }
});

router.post("/api/addvege", (req, res) => {
    
    db.farmers.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName
    }).then(function(data) {
        console.log(data);
        res.sendStatus(200);
    })
    
});


router.get("/farmer/addvege", (req, res) =>{
        try { 
                res.render("addvege");
        } catch(error) {
                res.status(500).send('Error, something is not working please try again.')
     }
    });

 
router.get("/farmer/:sales", (req, res) =>{
    let vegeparameter =  req.params.sales
 

        db.sales.findOne({
            where:{     
                
            },include: {model:products,
                where:{
                    product_name: vegeparameter,
                  
                }
            }
        }).then(function(data) {
            /*  console.log(data); */
             let vegeUppercase = vegeparameter.toUpperCase();
            
             let hdbrsObj = {
             sales: data,
             product_name: vegeUppercase,
          
             };
            res.render("sales", hdbrsObj);
        });
});




    
// API Routes
// =====================================================
router.get("/api/farmer"), (req,res) => {
    // api get request to call in farmer table information to create info cards
    farmers.findAll({}).then((results) => {
        res.json(results)
    })
}


module.exports = router;


