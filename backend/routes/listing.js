const router = require('express').Router();
let Listing = require('../models/listing.model');

// Create new listing
router.post("/new", async (req, res) => {
    const title = req.body.title;
    const university = req.body.university;
    const location = req.body.location;
    const description = req.body.description;
    const userId = req.body.userId;
    
    const newListing = new Listing({
        userId,
        title,
        university,
        location,
        description
      });
  
    newListing.save()
      .then(() => res.json('New listing added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;