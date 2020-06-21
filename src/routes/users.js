const express = require('express');
const multer = require('multer')
const sharp = require('sharp')
const router = express.Router();
const userController = require('../controller/controllers')
const { forwardAuthenticated ,ensureAuthenticated} = require('../middleware/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Signup Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

//Read
router.get('/read',ensureAuthenticated,(req,res) => res.render('read',{user:req.user}))

// Logout
router.get('/logout', userController.logout);

//Delete
router.get('/delete', userController.delete)

//Delete Confirmation
router.get('/deleteconf', (req,res)=> res.render('deleteconf',{user:req.user}))

//Update
router.get('/update', (req, res) => res.render('update',{user:req.user}));

router.post('/update', userController.update)

//Image upload

const upload = multer({
    //dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload jpg,jpeg or png file only!'))
        }
        cb(undefined,true)
    }
})


router.post('/avatar',upload.single('avatar'),async(req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.redirect('/users/dashboard')
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

router.get('/avatar',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.sendStatus(404).send()
    }
})

router.delete('/avatar',async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router;

//{"_id":{"$oid":"5eee0fd725ecb70a745e6eb7"},"name":"SAIDUL MONDAL","email":"mondalsaidul3232@gmail.com","mobile":7699368433,"avatar":{"$binary":"cGljNS5qcGc=","$type":"0"},"password":"$2a$10$jwKPbPxFuGbhUyoT.Hu5ouSE8mzyLtwUL.PjkqDp4Zc9E95.Je9tG","date":{"$date":"2020-06-20T13:32:07.315Z"},"__v":0}
