const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const authenticateMe = (req)=> {
    let token = false;

    if(!req.headers){
        token=false
    }
    else if(!req.headers.authorization) {
        token=false
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if(token){
        data = jwt.verify(token, "jblogsjblogsjblogs", (err,data)=> {
            if(err) {
                return false;
            } else {
                return data;
            }
        })
    }
    return data;
}

router.get("/",(req,res)=>{
    db.Blog.findAll().then(blogs => {
        res.json(blogs)
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

