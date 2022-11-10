const fs = require('fs');

const VisitorLogModel = require('../models/visitor_log');
const InfoModel = require('../models/info');
const ContactModel = require('../models/contact');
const InfoLogModel = require('../models/info_log');


// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        // Q3.1 fill info data into database (Mongoose style)

    });
}

// search for information related to keywords
exports.handleInfo = (req, res) => {
    var resp = {}

    // Q3.2 extract userId and keywords (as Array) from req.query 
    
    if (keywords) {
        // Q3.3 find all info related to keywords (use regex in Mongoose criteria) 

        // Q3.4 aggreate multiple info as one if multiple keywords are provided

        // Q3.5 insert new info log into database

    } else {
        // Q3.6 get name/phone/email from req.query

        // Q3.7 add new contact into database

    }

    res.status(200).json(resp);
}
