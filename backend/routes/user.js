const router = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
let User = require('../models/user.model');

router.post("/register", async (req, res) => {
  User.find()
    .then(newUser => res.json(newUser))
    .catch(err => res.status(400).json('Error: ' + err));
});

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

router.post("/login", async (req, res, next) => {
  
  passport.authenticate("local", (err, user, info) => {

    if (err) throw err;

    if (!user) 
    {
      res.send("No User Exists");

    } else {

      req.logIn(user, (err) => {

        if (err) throw err;
        res.send(req.user.id);
        next();
      });
    }
  })
  
  (req, res, next);
});

router.post("/logout", (req, res, next) => {

  req.logout();
  res.send(req.isAuthenticated());    
});

router.get("/check", async (req, res, next) => {

  res.send(req.isAuthenticated());
  (req, res, next);
})

module.exports = router;