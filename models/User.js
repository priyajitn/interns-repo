const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:false
    }
})

exports.User=mongoose.model("user",userSchema);