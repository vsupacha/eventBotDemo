const fs = require('fs');

const VisitorLogModel = require('../models/visitor');
const MapLogModel = require('../models/map_log');


exports.handleMap = (req, res) => {
    var resp = {}

    // Q1.3 extract userId and from(lat/lng) to(locationId) from req.body 
    var userId = req.query.userId;
    var fromLoc = req.query.fromLoc;
    var toLoc = req.query.toLoc;
    resp = {userId, fromLoc, toLoc};

    // Q1.4 insert new map log into database
    MapLogModel.create({
        userId: userId,
        fromLoc: fromLoc,
        toLoc: toLoc,
        createdAt: Date.now()
    });
    res.status(200).json(resp);
}
    
    

        