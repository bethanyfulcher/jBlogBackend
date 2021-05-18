const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateMe = (req) => {
    let token = false;

    if(!req.headers) {
        token = false;
    }
    else if(!req.headers.authorization) {
        token = false;
    }
    else {
        token = req.headers.authorization.split(" ")[1];
    }
    let data = false;
    if (token) {
        data = jwt.verify(token, "jblogsjblogsjblogs", (err, data) => {
            if(err) {
                return false;
            } else {
                return data
            }
        })
    }
    return data;
}

router.get("/", (req, res) => {
    res.send("this is the home page")
})

router.post("/signup", (req,res) => {
    db.User.create(req.body).then(newUser => {
        const token = jwt.sign({
            email: newUser.email,
            id: newUser.id,
            name: newUser.name,
        }, "jblogsjblogsjblogs",
        {
            expiresIn: "2h"
        })
        return res.json({user: newUser, token})
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/login', (req,res) => {
    db.User.findOne({
        where: {
            email: req.body.email
        },
        include: [db.Blog]
    }).then(user => {
        if(!user) {
            return res.status(404).send('no such user')
        }
        else if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign({
                email: user.email,
                id: user.id,
                name: user.name,
            }, "jblogsjblogsjblogs", 
            {
                expiresIn: "2h"
            })
            return res.json({user,token})
        }
        else {
            return res.status(403).send('wrong password')
        }
    })
})

router.get("/user/:id/blogs", (req,res)=> {
    let userData = authenticateMe(req);
    db.User.findOne({
        where:{
            id:req.params.id
        }
    }).then(user=>{
        res.json({
            name: user.name,
            Blogs: user.Blogs,
            // Fishes:user.Fishes,
            // Tanks: user.Tanks,
            isMyPage:userData&&userData.id===user.id
        })
    })
})

router.get("/secretclub", (req,res) => {
    let tokenData = authenticateMe(req);
    if(tokenData) {
        db.User.findOne({
            where: {
                id: tokenData.id
            },
            include: [{
                model:db.Blog,
            }]
        }).then(user=>{
            res.json(user)
        }).catch(err=> {
            res.status(500).json(err);
        })
    } else {
        res.status(403).send('auth failed')
    }
})

module.exports = router;