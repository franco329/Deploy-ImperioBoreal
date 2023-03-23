const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { softDeletePlugin } = require('soft-delete-plugin-mongoose')

const productSchema = new Schema({
    descriptionName:{
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: true
    },
    priceBusiness:{
        type: Number,
        required: true,
    }, 
    priceVAT: {
        type: Number,
        required: true,
    },
    priceVATBusiness: {
        type: Number,
        required: true,
    },
    image: {
        public_id: String,
        secure_url: String
    }
});

productSchema.plugin(softDeletePlugin);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

