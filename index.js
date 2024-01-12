const express = require('express');
const app = express();
const path = require('path');
const {User} = require('./userSchema/user');
const session = require('express-session');
const mongoose = require('mongoose');
const url = "mongodb+srv://ganeshbehera:ganesh@cluster0.hmnpzip.mongodb.net/userdb?retryWrites=true&w=majority";
async function db(url){
    try{
        await mongoose.connect(url);
        console.log("DataBase Connected");
    }catch(err){
        console.log(err);
    }
}
db(url);
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"hieveryone"
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

const port = 3000;
app.get('/',(req,res)=>{
    res.render('signup',{error:"",username:'',email:'',password:''});
})
app.post('/',async(req,res)=>{
    let error = "";
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if(!username){
        error = "Enter the Username";
        res.render('signup',{ error:error,username:username,email:email,password:password });
        // return res.status(400).send({error});
        return
    }
    
    if(!email){
        error = "Enter the Email";
        res.render('signup',{ error:error,username:username,email:email,password:password });
        return
    }
    if(!password){
        error = "Enter the Password";
        res.render('signup',{ error:error,username:username,email:email,password:password });
        return
    }
    const obj = {
        name:username,
        email:email,
        password:password
    }
    const user = new User(obj);
    await user.save();
    error = "";
    res.redirect('/login');
    return
})
app.get('/login',(req,res)=>{
    res.render('login',{error:"",email:'',password:''});
})
app.post('/login',async(req,res)=>{
    req.session.accept = false;
    let error="";
    const email = req.body.email;
    const password = req.body.password;
    if(!email){
        error = "Enter the Email";
        res.render('login',{ error:error,email:email,password:password });
    }
    if(!password){
        error = "Enter the Password";
        res.render('login',{ error:error,email:email,password:password });
    }
    const obj = await User.findOne({email:email})
    if(obj.email == email && obj.password == password){
        req.session.accept = true;
        res.redirect(`/home/${obj.name}`);
    }else{
        res.render('login',{error:"Invalid Username and Password",email:email,password:password});
    }
})
app.get('/forget',(req,res)=>{
    res.render('forget');
})
app.post('/forget',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    // await User.findOneAndUpdate({email:email},{password:password});
    const obj = await User.findOne({email:email});
    console.log(obj.email,obj.password);
    res.redirect('/login');
})
app.get('/home/:name',(req,res)=>{
    const name = req.params.name
    if(req.session.accept == true){
        res.render('home',{name:name});
    }else{
        res.redirect('/login');
    }
})
app.post('/home',(req,res)=>{
    req.session.accept = false;
    res.redirect('/login');
})
app.listen(port,()=>{
    console.log(`The Server is Running on port ${port}`);
});