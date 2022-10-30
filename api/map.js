const {VisitorModel, LocationModel, VisitorLogModel} = require('../models/visitor_model');
const {MapLogModel} = require('../models/map_model');

// populate database with JSON data
exports.populateMap = () => {
    // your code here
}

// generate location over map
exports.handleMap = (req, res) => {
    console.log(req.query);
    console.log(req.body);

    // your code here
    res.status(200).json(resp);
}

