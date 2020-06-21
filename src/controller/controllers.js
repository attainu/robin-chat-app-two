
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {sendWelcomeMail,sendGoodbyMail} = require('../emails/account');

const userControll = {
    signup: async(req,res) => {
        const { name, email, mobile, password, password2 } = req.body;
        let errors = [];
      
        if (password != password2) {
          errors.push({ msg: 'Passwords do not match' });
        }
      
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
      
        if (errors.length > 0) {
          res.render('signup', { errors, name, email, mobile, password, password2});
        } else {
          const user = await User.findOne({email: email})

          try {
            if (user) {
              errors.push({ msg: 'Email already exists' });
              res.render('signup', {errors, name, email, mobile, password, password2});

            } else {
              const newUser = new User({ name, email, mobile, password })
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, async(err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;

                  await newUser.save()
                  req.flash('success_msg', 'You are now registered and can log in');
                  sendWelcomeMail(newUser.email, newUser.name)
                  res.redirect('/users/login');
                })
              });
            }
          } catch(e) {
            res.status(400).send(e)
          }
        }  
    },
    login: async(req,res,next) => {
        try {
            await passport.authenticate('local', {
                successRedirect: '/dashboard',
                failureRedirect: '/users/login',
                failureFlash: true,
              })(req,res,next);
        } catch (e) {
            res.status(400).send(e)
        }
       
    },
    readImage: async(req,res) => {
      try{
        const user = await req.user
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
      }catch(e){
        res.sendStatus(404).send()
      }
    },
    logout: async(req,res) => {
        try {
            await req.logout();
            req.flash('success_msg', 'You are logged out');
            res.redirect('/users/login');
        } catch (e) {
            res.status(400).send(e)
        }
        
    },
    update: async(req,res) => {
        const updates = Object.keys(req.body)
        const allowedUpdate = ['name','email','mobile']
        const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))

        if(!isValidOperation){
             return res.status(400).send({error:'Invalid updates!'})
        }
        try{
      
            await updates.forEach((update)=>req.user[update]=req.body[update])
            req.user.save()
            res.redirect('/users/read')
        }catch(e){
            res.status(400).send(e)
        }
    },
    delete: async(req,res) => {
        try {
            await req.user.remove();
            req.flash('success_msg', 'You have successfully deleted your account. Signup a new account')
            sendGoodbyMail(req.user.email,req.user.name)
            res.redirect('/users/signup');
        } catch (e) {
            res.status(400).send(e)
        }
       
    },

    deleteImage: async(req,res) => {
      req.user.avatar = undefined
      await req.user.save()
      res.redirect('/dashboard')
    }
}

module.exports = userControll