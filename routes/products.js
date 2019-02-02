const router  = require('express').Router();
const Product = require('../models/Product')

router.get('/',(req,res)=>{
    Product.find({inStock:true}).then((products)=>{
        res.render('products/list',{products})
    }).catch(e=>res.render('error',e))
})
router.post('/',(req,res)=>{
    query= req.body.category=='' ?  {name:{$regex:req.body.name}} : {name:{$regex:req.body.name},category:req.body.category}    
    Product.find(query).then((products)=>{
        res.render('products/list',{products})
    }).catch(e=>res.render('error',e))
})
router.get('/detail/:id',(req,res)=>{
    Product.findById(req.params.id).then(item=>res.render('products/detail',item)).catch(e=>res.render('error',e))
})

router.get('/new',(req,res)=>{
    res.render('products/form').catch(e=>res.render('error',e))
})

router.post('/new',(req,res)=>{
    Product.create(req.body).then(product=>res.redirect('/products')).catch(e=>res.render('error',e))    
})
router.get('/:id/edit',(req,res)=>{
    Product.findById(req.params.id).then((item)=>{
        res.render('products/edit',{item})}).catch(e=>res.render('error',e))
})
router.post('/:id/update',(req,res)=>{
    Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).then(item=>{
        res.redirect('/products/detail/'+item._id)
    })
})

router.post('/:id/delete',(req,res)=>{
    Product.findByIdAndDelete(req.params.id).then(res.redirect('/products'))
})
module.exports = router