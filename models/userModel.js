const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is required'],
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'password is required'],
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'phone number is required'],
    },
    usertype:{
        type:String,
        required:[true,'user type is required'],
        default: 'client',
        enum:['client', 'admin', 'vender', 'driver'],
    },
    profile:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    answer:{
        type:String,
        require:[true,'Answer is required'],
    }
},{timestamps:true});

//export
module.exports = mongoose.model('User', userSchema);