const fs = require('fs');

const VisitorLogModel = require('../models/visitor');
const MapLogModel = require('../models/map_log');


exports.handleMap = (req, res) => {
    var resp = {}

    // Q1.3 extract userId and from(lat/lng) to(locationId) from req.body 
    
    // Q1.4 insert new map log into database

    res.status(200).json(resp);
}
    
    

        