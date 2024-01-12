const express = require('express');
const app = express();
app.set('view engine','ejs');

//const db= require('./connection');

const mongoose = require('mongoose');

//const user = require('./userModel');
const userModel = require('./userModel');

app.use(express.urlencoded({extended:true}))

app.use(express.json());

const user = mongoose.connect("mongodb+srv://aspruhasahoo:KLwGyJqpePbdBZtR@test1.mxwggm8.mongodb.net/?retryWrites=true&w=majority");

app.get('/entry', (req, res) => {
    res.render('dataentry');
  })
app.post('/entry',async(req,res)=>{
    const {name,email} = req.body;
    try{
        const newuser = await userModel.create({name,email})
        res.json(newuser)
    }catch(error){
        res.status(500).send(error);
    }
});

app.get('/data',async(req,res)=>{
    try{
        const data = await userModel.find();
        res.json(data);
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

app.put('/update/:id',async(req,res)=>{
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

