
const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {sendWelcomeMail,sendGoodbyMail} = require('../emails/account');

const userControll = {
    signup: async(req,res) => {
        const { name, email, mobile, avatar, password, password2 } = req.body;
        let errors = [];
      
        if (!name || !email || !mobile || !password || !password2) {
          errors.push({ msg: 'Please enter all fields' });
        }
      
        if (mobile < 10) {
          errors.push({ msg: 'Enter Your 10 Digit Mobile Number' });
        }
      
        if (password != password2) {
          errors.push({ msg: 'Passwords do not match' });
        }
      
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
      
        if (errors.length > 0) {
          res.render('signup', {
            errors,
            name,
            email,
            mobile,
            password,
            password2
          });
        } else {
          User.findOne({ email: email }).then(user => {
            if (user) {
              errors.push({ msg: 'Email already exists' });
              res.render('signup', {
                errors,
                name,
                email,
                mobile,
                password,
                password2
              });
            } else {
              const newUser = new User({
                name,
                email,
                mobile,
                avatar,
                password
              });
      
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => {
                      req.flash(
                        'success_msg',
                        'You are now registered and can log in'
                      );
                      sendWelcomeMail(user.email,user.name)
                      res.redirect('/users/login');
                    })
                    .catch(err => console.log(err));
                });
                
              });
            }
          });
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
    read: (req,res) => {},
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
       
    }
}

module.exports = userControll