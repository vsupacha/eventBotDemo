const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {InfoModel,InfoLogModel} = require('../models/info_model');

// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        console.log(infos);
        // your code here
    });
}

// search for information related to keywords
exports.handleInfo = (req, res) => {
    console.log(req.query);
    console.log(req.body);

    // your code here
    res.status(200).json({status:'OK'});
}

