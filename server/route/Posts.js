const express = require('express');
const router  = express.Router();
const {Posts} = require('../models');
const {validateToken} =require('../midleware/authvalidation')

router.post('/inscription',async (req,res)=>{
    const post= req.body ;
    console.log(post)
await Posts.create(post);
res.json(post)
    
})


router.get('/liste_inscri', async (req, res) => {
    const Listeinscri =  await Posts.findAll();
    res.json(Listeinscri)
})


router.get('/liste_par_id/:id', async (req,res)=>{
  
    const id = req.params.id ;
    const Liste_inscri_par_id= await Posts.findByPk(id) ;
    res.send(Liste_inscri_par_id)
})

router.delete('/delete_post/:id',validateToken, async (req,res)=>{
    const id = req.params.id ;
await Posts.destroy({where:{id:id}})
res.json("DELETE POST OK")
})


module.exports= router