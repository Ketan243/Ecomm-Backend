const router = require('express').Router();
const verify = require('./verifyToken');
const multiparty = require('multiparty')
const Product = require('../model/Product')
const { productVal } = require('../validation/val')

//Image Upload
const IMAGE_UPLOAD_DIR = './public/images';
const IMAGE_BASE_URL = 'http://localhost:3000/images/'
// const IMAGE_BASE_URL = 'https://ecomm-backend-production-acca.up.railway.app/images/'

router.get('/', async (req, res) => {

    const product = await Product.find();
    res.json({
        product: product
    });
});

router.post('/', verify, async (req, res) => {
    const id = req.body.id;

    //checking if product exist and returning the product matching id
    const product = await Product.findOne({ _id: id });
    res.json({
        Product: product
    });
});

router.post('/add_product', verify, async (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    let form = new multiparty.Form({ uploadDir: IMAGE_UPLOAD_DIR });
    form.parse(req, async function (err, fields, files) {
        if (err) return res.send({ error: err.message });

        const imagePath = files.image[0].path;
        const imageFileName = imagePath.slice(imagePath.lastIndexOf("\\") + 1);
        const imageURL = url + '/images/' + imageFileName;
        console.log(imageURL);
        //Checking if product already exists
        const productExist = await Product.findOne({ product_name: fields.product_name[0] });

        if (productExist) return res.status(400).send('Product already exists');

        //Adding new product
        const product = new Product({
            product_name: fields.product_name[0],
            product_desc: fields.product_desc[0],
            image: imageURL,
            price: fields.price[0],
            brand_name: fields.brand_name[0],
            category: fields.category[0]
        });

        try {
            const savedProduct = await product.save();
            console.log(`Product = ${JSON.stringify(savedProduct, null, 2)}`);
            res.send({ savedProduct });
        }
        catch (err) {
            res.status(400).send(err);
        }
    })



});

module.exports = router;