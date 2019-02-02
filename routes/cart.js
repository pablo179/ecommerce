const router=require('express').Router()
const Product=require('../models/Product')

router.post('/add',(req,res)=>{
    const {cart} =req.app.locals
    const {productId}=req.body
    cart[productId] ?   cart[productId]++ : cart[productId]=1
    res.redirect('back')
})
router.post('/remove',(req,res)=>{
    const {cart} =req.app.locals
    const {productId}=req.body
    cart[productId] ?   cart[productId]-- : cart[productId]=0
    res.redirect('back')
})

router.get('/',(req,res)=>{
    const {cart}=req.app.locals
    Product.find({_id:{$in:Object.keys(cart)}})
    .then(products=>{
        let total=0
        products=products.map(p=>{
            total +=p.price*cart[p._id]
            let product = {
                product:p,
                quantity:cart[p._id]
            }
            return product
        })
        res.render('products/cart',{products, total})})
    .catch(e=>res.render('error',e))
})

module.exports= router