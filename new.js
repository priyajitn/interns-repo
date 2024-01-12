const express = require('express');
const app = express();
app.set('view engine','ejs');

//const db= require('./connection');

const mongoose = require('mongoose');
const {authSchema} = require('./validation_scema')

//const user = require('./userModel');
const userModel = require('./userModel');

app.use(express.urlencoded({extended:true}))

app.use(express.json());

const user = mongoose.connect("mongodb+srv://aspruhasahoo:KLwGyJqpePbdBZtR@test1.mxwggm8.mongodb.net/?retryWrites=true&w=majority");

app.get('/entry', (req, res) => {
    res.render('dataentry',{ errorMessage: undefined });
  })
app.post('/entry',async(req,res)=>{
    try {
        const value = await authSchema.validateAsync(req.body);
        console.log(value);

        const { name, email } = value;

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.render('dataentry', { errorMessage: 'Email already exists.' });
        }

        // if (name === "" || email=== "") {
        //     return res.render('dataentry', { errorMessage: 'please fill the required fields' });
        // }

        const newuser = await userModel.create({ name, email });

        //res.json(newuser);
        return res.render('dataentry', { errorMessage: 'Succesfully saved to database' });
    } catch (error) {
        if (error.isJoi === true) {
            return res.render('dataentry', { errorMessage: 'Invalid credentials.' });
        }
        res.status(500).send(error);
    }
});

app.get('/data',async(req,res)=>{
    try{
        const data = await userModel.find();
        res.render('allUsers', { users: data });
        //res.json(data);
    }catch(error){
        res.status(500).send(error);
    }
})

app.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        const singleuser = await userModel.findById(id);
        res.json(singleuser);
    }catch(error){
        res.status(500).send(error);
    }
})

app.put('/:id',async(req,res)=>{
    const {id} = req.params.id;
    const {name,email} = req.body;
    try{
        const updated_data = await userModel.findByIdAndUpdate(id,{name,email});
        res.json(updated_data);
        //res.redirect('/entry');
    }catch(error){
        res.status(500).send(error);
    }
})

app.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const {name,email} = req.body;
    try{
        const updated_data = await userModel.findByIdAndDelete(id,{name,email});
        res.json({status : 'deleted succesully'});
    }catch(error){
        res.status(500).send(error);
    }
})




app.listen(3001,() => {
    console.log('listening to 3001');
})
if(user){
    console.log('connected to cloud ')
}else{
    console.log('failed to connect');
}

