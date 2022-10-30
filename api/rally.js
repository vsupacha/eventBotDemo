const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {RallyModel,RallyLogModel} = require('../models/rally_model');

// populate information data
exports.populateRally = () => {
    fs.readFile('./data/rally.json', (err, content) => {
        if (err) return console.log('Error loading rally data', err);
        let rallys = JSON.parse(content);
        console.log(rallys);
        // your code here
    });
}

// record rally activities
exports.handleRally = (req, res) => {
    console.log(req.query);
    console.log(req.body);

    // your code here
    res.status(200).json({status:'OK'});
}