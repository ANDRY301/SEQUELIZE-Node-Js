const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcrypt')
const {Users} = require('../models');
const {sign}  = require('jsonwebtoken');
const {validateToken} = require('../midleware/authvalidation')


router.post('/registre', async (req,res)=>{
    const {username ,password } = req.body ;

bcrypt.hash(password,10).then( (hash)=>{
    Users.create({
        username : username,
        password : hash
    })
})
res.json("inscription fait")
})


router.post('/log', async (req,res)=>{

  
const {username ,password } = req.body ;
console.log(username)
const user = await Users.findOne({ where :{ username : username}});

if (!user) { res.json({error:" VOUS ETEZ PAS DANS LA BASE"})}

bcrypt.compare(password,user.password).then( (match)=>{
    if(!match){res.json({error:"MOT DE PASS FAUX"})}

    const accessToken = sign({
        username: user.username,
        id      : user.id},"lakile")

    res.json({token:accessToken,username:username,id : user.id});


})
})

router.get('/auth',validateToken,async (req,res)=>{
    res.json(req.user)
})
module.exports = router