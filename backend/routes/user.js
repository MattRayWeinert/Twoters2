const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
let User = require('../models/user.model');


// Register new user
router.post("/", async (req, res) => {
  const username = req.body.username;
  const plainPassword = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const salt = await bcrypt.genSalt();
  const password = await bcrypt.hash(plainPassword, salt);

  const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      email
    });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


// User Login
router.post("/login", async (req, res, next) => {
  
  passport.authenticate("local", (err, user, info) => {

    if (err) throw err;

    if (!user) 
    {
      res.send("No User Exists");

    } else {

      req.logIn(user, (err) => {

        if (err) throw err;
        res.send(req.user);
        next();
      });
    }
  })
  
  (req, res, next);
});


// User Logout
router.post("/logout", (req, res, next) => {

  req.logout();
  res.send(req.isAuthenticated());    
});


// Check if user is logged in
router.get("/check", async (req, res, next) => {

  res.send(req.isAuthenticated());
  (req, res, next);
});


// Relays and grabs the user's data
router.get("/data", async (req, res, next) => {

  User.findById(req.user.id, function (err, docs) { 
    if (err || !docs)
    { 
        res.send(err); 
    } 
    else
    { 
        res.send(docs);
    } 
}); 
  (req, res, next);
});


// Update the users settings
router.put("/update", async (req, res, next) => {

  if (req.body.username != '')
  {
    User.findByIdAndUpdate(req.body.id, { username: req.body.username }, function(err, user) { });
  }

  if (req.body.firstName != '')
  {
    User.findByIdAndUpdate(req.body.id, { firstName: req.body.firstName }, function(err, user) { });
  }

  if (req.body.lastName != '')
  {
    User.findByIdAndUpdate(req.body.id, { lastName: req.body.lastName }, function(err, user) { });
  }

  if (req.body.email != '')
  {
    User.findByIdAndUpdate(req.body.id, { email: req.body.email }, function(err, user) { });
  }

  res.send("User updated!");

  (req, res, next);
});

module.exports = router;