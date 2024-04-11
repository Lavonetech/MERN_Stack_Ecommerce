const express=require('express');
const { createProduct, getProduct, notifyUrl,upload, Imageupload,} = require('../controllers/productController');
const router=express.Router();

router.post('/createproduct',upload.single('Image'),createProduct);
router.get('/product', getProduct);
router.post('/notify_url',notifyUrl);
router.post('/upload', upload.single('Image'), Imageupload);

    // Get the path to the uploaded image
  
module.exports=router;