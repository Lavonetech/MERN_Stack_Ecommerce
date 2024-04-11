const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');

const createToken=(user)=>{
return jwt.sign({user},"this time ok",{
    expiresIn:'1s'
})
    
}
const createUser = async (req, res) => {
  const { 
    firstName,
    lastName,
    email, 
    password ,
    phone,
    address,
    city,
    country,
  
  } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email, 
      password ,
      phone,
      address,
      city,
      country,
    });
    res.status(200).json({ message: "User signup sucessful",user:user});
  } catch (err) {
    if (err) {
      console.log(err.message);
    }
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = createToken(user);
        res.status(200).json({
           token: token
          
          });
      } else {
        res.status(401).json({ message: "Your password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "You are not registered" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};

const getUserByEmail=async (req,res)=>{

  const userEmail=req.email;
  try{
 const user=await User.findOne({email:userEmail});
 if(user){
   res.status(200).json({

    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    address: user.address,
    city: user.city,
    country: user.country,
   })

 }else{
  res.status(404).json({message:"user not found"})
 }


  }catch(e){
    console.log(e);
    res.status(500).json({message:"An error occurd"})
  }
}
  
const getUser = async (req, res) => {
  try {
    
    const user = await User.find(); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err); // Changed to console.error for error logging
    res.status(500).json({ message: 'Server error' });
  }
};

  



module.exports = { createUser, userLogin,getUser,getUserByEmail};
