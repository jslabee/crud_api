const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Product = require('./model');
const db = "mongodb://jure:jure@ds013599.mlab.com:13599/products";

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err);
    }
});

//tukaj potegneš vse producte
router.get('/products', function(req, res){
    console.log('Get request for all products');
    Product.find({})
    .exec(function(err, products){
        if (err){
            console.log("Error retrieving products");
        }else {
            res.json(products);
            console.log(products)
           
        }
    });
});

//tukaj potegneš ven en product
router.get('/product/:id', function(req, res){
    console.log('Get request for a single product');
    Product.findById(req.params.id)
    .exec(function(err, product){
        if (err){
            console.log("Error retrieving product");
        }else {
            res.json(product);
        }
    });
});

//postanje producta
router.post('/product', function(req, res){
    console.log('Post a product');
    var newProduct = new Product();
    newProduct.name = req.body.name;
    newProduct.price = req.body.price;
    newProduct.available = req.body.available;
    newProduct.dateCreated = req.body.dateCreated;
    newProduct.save(function(err, insertedProduct){
        if (err){
            console.log('Error saving product');
        }else{
            res.json(insertedProduct);
        }
    });
});

// urejanje producta
router.put('/product/:id', function(req, res){
    console.log('Update a product');
    Product.findByIdAndUpdate(req.params.id,
    {
        $set: {name: req.body.name, price: req.body.price, available: req.body.available, dateCreated: Date.now}
    },
    {
        new: true
    },
    function(err, updatedProduct){
        if(err){
            res.send("Error updating product");
        }else{
            res.json(updatedProduct);
        }
    }

    );
});

/// brisanje producta
router.delete('/product/:id', function(req, res){
    console.log('Deleting a product');
    Product.findByIdAndRemove(req.params.id, function(err, deletedProduct){
        if(err){
            res.send("Error deleting product");
        }else{
            res.json(deletedProduct);
        }
    });
});

module.exports = router;