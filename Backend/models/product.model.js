const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true,'Name is required']
        },
        quantity:{
            type: Number,
            required: false,
            default: 0
        },
        price:{
            type: Number,
            required: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model('Product',productSchema);

module.exports = Product;