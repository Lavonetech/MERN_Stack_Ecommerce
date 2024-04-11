const Product = require("../model/Products");
const crypto = require('crypto'); 
const multer=require('multer');


//Upload imges using multer middleware
const storage=multer.diskStorage({
   destination:function(req,file,cb){
    cb(null, 'uploads')
   },
   filename:function(req,file,cb){
    cb(null,Date.now() + file.originalname);
   }
});

const fileFilter=(req,file,cb)=>{
   if(file.mimetype === 'image/jpeg' || file.mimetype==='image/png'){
    cb(null,true);

   } else{
     cb(null,false)
   }
}

const upload =multer({

  storage:storage,
  fileFilter:fileFilter
});
//image upload using multer
const Imageupload=async (req, res) => {
  try {
      const imagePath = req.file.path; // Get the path to the uploaded image

      const newProduct= new Product({
        Image:imagePath
      })
   const productImage= await newProduct.save()
   if(productImage){
    res.status(200).json({ message: 'File uploaded successfully',Image:productImage });
   }else{
    res.status(500).json({message:"product image not save in database"})
   }
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const notifyUrl= (req, res) => {
  const {
    merchant_id,
    order_id,
    payment_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig,
   
  } = req.body;

  // Replace this with your actual merchant secret
  const merchantSecret = 'Mzg5NDQyODI1OTUxNzY2MTQzMzE0MTIxMDEzODM1NjI2NTEwNTk=';

  // Verify the integrity of the payment notification
  const data = `${merchant_id}${order_id}${payment_id}${payhere_amount}${payhere_currency}${status_code}${md5sig}`;
  const calculatedMd5sig = md5(data + merchantSecret).toUpperCase();

  if (calculatedMd5sig !== md5sig) {
    // Signature mismatch, do not proceed further
    console.log('Invalid signature. Payment notification could not be verified.');
    return res.sendStatus(400);
  }

  // Process the payment status
  if (status_code === '2') {
    // Payment succeeded
    console.log('Payment succeeded. Update your database accordingly.');
    // Update your database here with the payment status
  } else if (status_code === '0') {
    // Payment is pending
    console.log('Payment is pending. Update your database accordingly.');
    // Update your database here with the payment status
  } else if (status_code === '-1') {
    // Payment was canceled
    console.log('Payment was canceled. Update your database accordingly.');
    // Update your database here with the payment status
  } else if (status_code === '-2') {
    // Payment failed
    console.log('Payment failed. Update your database accordingly.');
    // Update your database here with the payment status
  } else if (status_code === '-3') {
    // Payment was charged back
    console.log('Payment was charged back. Update your database accordingly.');
    // Update your database here with the payment status
  } else {
    // Invalid status code
    console.error('Invalid status code received.');
  }

  // Send a response to PayHere
  res.sendStatus(200);
};

function generatePayHereHash(merchantId, orderId, amount, currency, merchantSecret) {
  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replace(/,/g, '');
  const data = merchantId + orderId + amountFormatted + currency + hashedSecret;
  const hash = crypto.createHash('md5').update(data).digest('hex').toUpperCase();
  return hash;

}

const createProduct = async (req, res) => {
  const imagePath=req.file.path;
  const { name, orderId, description,stock, price} = req.body;
  try {
    const merchantId = '1223543'; // Convert to string since merchant ID seems to be a string
    const amount = price; // Use the product's price as the amount
    const currency = 'LKR';
    const merchantSecret =
      'Mzg5NDQyODI1OTUxNzY2MTQzMzE0MTIxMDEzODM1NjI2NTEwNTk=';

      const hash = generatePayHereHash(
      merchantId,
      orderId,
      amount,
      currency,
      merchantSecret
    );

    const product = new Product({
      name,
      orderId,
      description,
      price,
      stock,
      image:imagePath,
      hash,
      
    });
   const saveproduct=await product.save();
    if(saveproduct){
      res.status(200).json({message:"product data saved successfully", saveproduct})
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find(); // Retrieve all products
    
    if (products.length > 0) {
      const formattedProducts = products.map(product => ({
        id: product._id,
        orderId:product.orderId,
        name: product.name,
        description: product.description,
        stock:product.stock,
        price: product.price,
        image:product.image,
        hash:product.hash,
       
      
      }));
    
      res.status(200).json(formattedProducts);
    } else {
      res.status(404).json({ message: "No products found" });
    }
  } catch (err) {
    console.error("Error finding products:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { upload,Imageupload,createProduct, getProduct,notifyUrl };
