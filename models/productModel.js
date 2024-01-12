const mongoose = require('mongoose');

// creating a schema using mongoose.schema

const productSchema = mongoose.Schema(
    {
        name:{
            type: String, 
            requied: [true, "Please enter a product name"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0

        },
        price:{
            type: Number,
            required: true,
            default: 0
        },
        image:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
        
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;