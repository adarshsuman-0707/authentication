const express = require('express');
// const mongoose = require('mongoose');
const userModel = require('./model/model');
const bcrypt = require('bcrypt');
const joi = require('joi');
const app = express();
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
require('./db/connect')
// let ino = new userModel({ firstname: "Adarsh", lastname: "suman", email: "adarshsumanemail@gmail.com", password: "jantamahan" })
// ino.save()
let PORT = 5000;
app.listen(PORT, () => {
    console.log("run");
})

app.get('/signup', (req, res) => {
    res.render("signup")
})
app.post("/signups", async (req, res) => {

    // let {email}=req.body;
    // console.log(email);
    // let user=await userModel.findOne({email})
    // console.log(user);
    // if(user){
    //     res.send("already exist")
    // }

    const data = req.body
    const rules = {
        firstname: joi.string().required().min(2).max(10).required(),
        lastname: joi.string().required().min(2).max(10).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().min(8).required(),
    }
    const schema = joi.object(rules)
    const result = schema.validate(data)
    const error = result["error"]
    if (error) {
        res.send(error)
    }

    else {
        let { email } = req.body;
        console.log(email);
        let user = await userModel.findOne({ email })
        console.log(user);
        if (user) {
            res.send("already exist")
        }
        else {
            // res.send("new user")
            let { firstname, lastname, email, password } = req.body;
            password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
            let newUser = new userModel({ firstname, lastname, email, password })
            console.log(newUser);
            await newUser.save();
            res.send("Successfully registered")
        }
    }
})

app.get("/login", (req, res) => {
    res.render('login');
})

app.post('/login', async (req, res) => {
    const data = req.body
    const rules = {
        // firstname: joi.string().required().min(2).max(10).required(),
        // lastname: joi.string().required().min(2).max(10).required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: joi.string().min(8).required(),
    }
    const schema = joi.object(rules)
    const result = schema.validate(data)
    const error = result["error"]
    if (error) {
        res.send(error)
    }

    else {
        let { email,password } = req.body;
        console.log(email);
        let user = await userModel.findOne({ email })
        console.log(user.password);

       let result= await bcrypt.compare(password, user.password)
        console.log(result);
        if(result){
        res.send("Finally Login done")
    }
        else{        
              res.send("wrong password")
}
    }
})