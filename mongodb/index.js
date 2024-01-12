const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.set('view engine', 'ejs');

const db=mongoose.connect('mongodb+srv://ayusmanparida:4tCeqjTI2KQzV88K@ayusmanusers.4poszg4.mongodb.net/');


app.use(express.urlencoded({extended:true}));
app.use(express.json());

//const User=require('./models/userModel');
const userModel = require('./models/userModel');

// async function insert(){
//     await User.create({
//         name:"Ayusman",
//         email:"ayusman123@gmail.com"
//     })
//     await User.insertMany({
//         name:"zombie",
//         email:"zombie@gmail.com"
//     })
// }
// insert();
app.get('/',(req,res)=>{
    console.log("Entry form page");
    res.render('form');
})
app.post('/',async (req,res)=>{
    const {name,email}=req.body;
    console.log(req.body);
    const newPost=await userModel.create({name,email});
    console.log("Successfully inserted into the database");
    res.json(newPost);
})

//gets all the users
app.get('/users', async (req, res) => {
    try {
        
        const users = await userModel.find();

        const namesArray = users.map(user => user.name);
        res.send(namesArray.join('<br>'));

      
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/users/:id',async (req,res)=>{
    const id=req.params.id;
    const post =await userModel.findById(id);
    res.json(post);
})
app.put('/users/:id',async (req,res)=>{
    const {name,email}=req.body;
    const id=req.params.id;
    const post =await userModel.findByIdAndUpdate(id,{name,email});
    res.json(post);
})
app.delete('/users/:id',async (req,res)=>{
    const id=req.params.id;
    const post =await userModel.findByIdAndDelete(id);
    res.json("deleted");
})
app.listen(3000,()=>{
    console.log("Server is runnning");
})