require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 8080
const dbConnect = require("./config/db");
const { User } = require("./models/User")


dbConnect()
app.use(express.json())


app.get("/users", async (req, res) => {
    const users = await User.find();
    return res.status(200).json({
        message: "Users fetched succesfully.",
        users
    })
})
app.post("/adduser", async (req, res) => {
    const { user_name, email, phone_no, desc } = req.body;
    // console.log(req.body)
    if (user_name != "" && email != "" && phone_no != "" && desc != "") {
        const userObj = { user_name, email, phone_no, desc };
        const user = new User(userObj);
        await user.save();

        return res.json({
            "message": "User added Succesfully"
        })
    }

})

app.put("/update/:user_name",async (req,res)=>{
    const user_name=req.params.user_name;
    const {newEmail,newPhoneNo,newDesc}=req.body;
    try{
        const users =await User.findOne({user_name})
        console.log(users._id)
        const userObj={user_name:user_name,email:newEmail,phone_no:newPhoneNo,desc:newDesc}
        console.log(userObj)
        await User.findByIdAndUpdate(users._id,userObj)
        return res.json({
            message:"User Updated Succesfully",
        })
    }catch(err){
        return res.status(500).json({
            message:"Something went Wrong",
            err
        })
    }
})

app.delete("/del", async (req, res) => {
    const {user_name} = req.body;
    console.log(user_name);
    try {
        const users = await User.findOne({ user_name:user_name })
        console.log(users)
        await User.findByIdAndDelete(users._id)
        return res.json({
            message: "User deleted Succesfully."
        })
    }catch(err){
        return res.json({
            message:"No user found with the given name.",
            err
        })
    }
    
})

app.listen(PORT, async () => {
    console.log(`Server started at port ${PORT}`)
})