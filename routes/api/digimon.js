// Add Express.js
const express = require('express');
// Add the Express.js router 
const router = express.Router();
// Add the faux Digimon database
const digimon = require('../../database/Digimon');

// Count Digimon
const total_digimon = digimon.length;

// Get all Digimon
router.get('/', (req, res) => res.json(digimon));

// Get Digimon by Name
router.get('/name/:name', (req, res) => {
    const digimon_name = req.params.name;
    const found = digimon.some(digimon => digimon.name.toLowerCase() === digimon_name.toLowerCase());
    
    if(found) {
        res.json(digimon.filter(digimon => digimon.name.toLowerCase() === digimon_name.toLowerCase()));
    } else {
        res.status(400).json(
            {
                ErrorMsg: `${digimon_name} is not a Digimon in our database.` 
            }
        );
    }
});

// Get single Digimon by ID
router.get('/id/:id', (req, res) => {
    const digimon_id = req.params.id;
    const found = digimon.some(digimon => digimon.id === parseInt(digimon_id));
    
    if(found) {
        res.json(digimon.filter(digimon => digimon.id === parseInt(digimon_id)));
    } else {
        
        res.status(400).json(
            {
               ErrorMsg: `A Digimon with an ID of ${digimon_ID} could not be returned because there are only ${total_digimon} Digimon in our database.` 
            }
        );
    }
});

// Export Digimon route
module.exports = router;