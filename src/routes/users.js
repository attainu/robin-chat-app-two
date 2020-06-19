const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {sendWelcomeMail,sendGoodbyMail} = require('../emails/account');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated ,ensureAuthenticated} = require('../middleware/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

// Register
router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
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
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
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
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Read
router.get('/read',ensureAuthenticated,(req,res) => res.render('read',{user:req.user}))

// Logout
router.get('/logout',(req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

//Delete
router.get('/delete',(req,res)=>{
   req.user.remove();
   req.flash('success_msg', 'You have successfully deleted your account. Signup a new account')
   sendGoodbyMail(req.user.email,req.user.name)
   res.redirect('/users/signup');
  //  res.send(req.user)
   
   
 })

//Update
router.get('/update',ensureAuthenticated, (req, res) => res.render('update',{user:req.user}));

router.post('/update',async(req,res)=>{
  const updates = Object.keys(req.body)
  const allowedUpdate = ['name','email','password']
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
})

module.exports = router;
