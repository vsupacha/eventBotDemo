const fs = require('fs');

const VisitorLogModel = require('../models/visitor_log');
const InfoModel = require('../models/info');
const InfoLogModel = require('../models/info_log');


// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        // Q2.1 fill info data into database (Mongoose style)

    });
}

// search for information related to keywords
exports.handleInfo = (req, res) => {
    var resp = {}

    // Q2.2 extract userId and keywords (as Array) from req.body 
    
    // Q2.3 find userId from last location in VisitorLog

    if (location) {
        // Q2.4 find all info based on location and keywords

    } else {
        // Q2.5 select all info based on keywords

    }
    // Q2.6 generate response and return to user

    res.status(200).json(resp);
}
