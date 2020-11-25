const router = require('express').Router();
let Listing = require('../models/listing.model');
const uri = process.env.ATLAS_URI;

/*
  Create new listing
*/
router.post("/new", async (req, res) => {
  const title = req.body.title;
  const university = req.body.university;
  const location = req.body.location;
  const description = req.body.description;
  const userId = req.body.userId;
  const username = req.body.username;
  
  const newListing = new Listing({
      userId,
      title,
      university,
      location,
      description,
      username
    });

  newListing.save()
    .then(() => res.json('New listing added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/*
  Query for posts through the titles
*/
router.post("/search", async (req, res) => {

  const value = req.body.searchText;

  Listing.find(({ title: { $regex: value, $options: "i" }}), function(err, docs) {
    res.send(docs);
  });

});

/*
  Query for user's specific posts for the dashboard page
*/
router.post("/userPosts", async (req, res) => {

  const value = req.body.userID;

  Listing.find(({ userId: value }), function(err, docs) {
    res.send(docs);
  });

});

module.exports = router;