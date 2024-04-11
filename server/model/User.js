const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({

    firstName:{
        type:String,
        unique:true,
        lowercase:true,

    },
    lastName:{
        type:String,
        unique:true,
        lowercase:true,

    },
   phone:{
        type:String,
       
        unique:true,
        lowercase:true,

    },
    address:{
        type:String,
    
        unique:true,
        lowercase:true,

    },

    city:{
        type:String,
       
        unique:true,
        lowercase:true,

    },
    country:{
        type:String,
       
        unique:true,
        lowercase:true,

    },
    email:{
        type:String,
        lowercase:true,

    },

    password:{
          type:String,
          minlength:6
    }
})

userSchema.pre('save', async function(next){
    const salt=await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt)
    next();
})
const User=mongoose.model('user',userSchema);
module.exports=User;