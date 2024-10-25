const Logo = require('../models/logos')
const store=(req,res,next)=>{
    const newlogo= new Logo({
        teamname:req.body.teamname
    })
    if(req.file){
        newlogo.avatar= req.file.path
    }
    newlogo.save()
    .then(response=>{
        res.json({
            message:"logo added succesfully"
        })
    })
    .catch(error=>{
        console.log(error)
        message:"an error occured"
    })   
}
const retrieve=(req,res,next)=>{
    Logo.findOne({teamname:req.body.teamname})
    .then(response=>{
        res.json(response)
    })
    .catch(error=>{
        res.json({
            error:"an error occured"
        })
    })
}
module.exports = {
    store, retrieve
}