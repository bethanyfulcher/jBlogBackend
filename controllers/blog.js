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

// router.get("/",(req,res)=>{
//     db.Blog.findAll().then(blogs => {
//         res.json(blogs)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// })

// router.post("/",(req,res)=>{
//     const userData = authenticateMe(req);
//     if(!userData) {
//         res.status(403).send("you are not logged in")
//     } else {
//         db.Blog.findOne({
//             where:{
//                 id:req.body.blog
//             }
//         }).then(blog=> {
//             if(blog.UserId===userData.id) {
//                 db.Blog.create({
                    
//                 })
//             }
//         })
//     }
// })

