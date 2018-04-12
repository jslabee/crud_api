const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    available: Boolean,
    dateCreated: {type: Date, default: Date.now},
},{ versionKey: false });

module.exports = mongoose.model('product', productSchema, 'products');