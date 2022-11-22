const router = require('express').Router();
const verify = require('./verifyToken');
const Product = require('../model/Product')
const {productVal} = require('../validation/val')

router.get('/' , async (req,res)=>{

    const product = await Product.find();
    res.json({
        product:product
    });
});

router.post('/',verify ,async (req,res)=>{
    const id = req.body.id;

    //checking if product exist and returning the product matching id
    const product = await Product.findOne({_id:id});
    res.json({
        Product:product
    });
});

router.post('/add_product',verify, async (req, res)=>{
    //Validation
    const {error} = productVal(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Checking if product already exists
    const productExist = await Product.findOne({product_name:req.body.product_name});
    
    if(productExist) return res.status(400).send('Product already exists'); 

    //Adding new product
    const product = new Product({
        product_name:req.body.product_name,
        product_desc:req.body.product_desc,
        image:req.body.image,
        price:req.body.price,
        brand_name:req.body.brand_name,
        category:req.body.category
    });
    try{
        const savedProduct = await product.save();
        res.send({product_id:product._id});
    }
    catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;