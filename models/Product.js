const mongoose=require('mongoose')
const Schema=mongoose.Schema

const productSchema = new Schema({
    name: String,
    description: String,
    category:{
        type:String,
        enum:['chidos','mas chidos','super chidos']
    },
    price: Number,
    inOffer:{
        type: Boolean,
        default: false
    },
    offerPrice: Number,
    inStock:{
        type: Boolean,
        default:true
    },
    productImageURL:String
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)
