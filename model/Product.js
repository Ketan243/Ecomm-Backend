const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name:{
        type: String,
        required: true,
        max:15
    },
    product_desc:{
        type: String,
        required: true,
        max:255
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type: String,
        required: true,   
    },
    brand_name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
}) 

module.exports = mongoose.model('Product',productSchema)