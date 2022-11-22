const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/' ,(req,res)=>{
    res.json({
        posts:{
            title:'My First Post',
            des:'Random stuff'
        }
    });
});

module.exports = router;