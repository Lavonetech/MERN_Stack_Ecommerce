const express=require('express');
const {createUser,userLogin,getUser,getUserByEmail}=require('../controllers/authController')
const verifyToken=require('../middleware/verifyJwt');



const router=express.Router();
router.post('/signup',createUser);
router.post('/login',userLogin);
router.get(`/profile`, getUserByEmail);
router.get('/userdetails',getUser);



module.exports=router;