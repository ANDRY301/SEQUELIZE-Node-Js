const express = require('express');
const router  = express.Router();
const {Comments}= require('../models');
const {validateToken} =require('../midleware/authvalidation')

router.post("/post_comment", validateToken , async (req,res)=>{
    const Commentpost = req.body ;

    /*/1---rajout----/*/
    const username    = req.user.username
    Commentpost.username = username

await Comments.create(Commentpost);

res.send("commentaire fait")
})


router.get("/dela/:postId" , async (req,res)=>{
    const postId     = req.params.postId ;
    console.log(req.params)
 

    const getcomment = await Comments.findAll({where:{PostId:postId }});
    res.json(getcomment)
})


router.delete("/del_comm/:com_id", validateToken, async (req,res)=>{
 const com_id = req.params.com_id

 await Comments.destroy({where:{id:com_id}})
 res.json('commentaire effacer')

})

module.exports = router
