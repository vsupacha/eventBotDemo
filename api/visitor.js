const VisitorModel = require('../models/visitor');
const VisitorLogModel = require('../models/visitor_log');


// activate visitor in database
exports.activateVisitor = async (userId) => {
    await VisitorModel.findOneAndUpdate(
        { userId: userId },
        { userStatus: true, updatedAt: Date.now() },
        { upsert: true }
    )
}

// deactivate visitor in database
exports.deactivateVisitor = async (userId) => {
    await VisitorModel.findOneAndUpdate(
        { userId: userId },
        { userStatus: false, updatedAt: Date.now() },
        { upsert: true }
    )
}

// insert new location into database
exports.addVisitorLog = async (userId, locationId) => {
    await VisitorLogModel.create({
        userId: userId,
        locationId: locationId,
        createdAt: Date.now()
    });
}

// query latest location of userId
exports.handleVisitor = async (req,res) => {
    var resp;

    if (Object.keys(req.query).length > 0) {
        // find latest visitor location in database
        resp = await VisitorLogModel.findOne(
            {userId:req.query['userId']},
            null, 
            {sort:{createdAt: -1}}
        );
        if (!resp) {
            resp = {};
        }
    } else {
        resp = {};
    }
    console.log(resp)
    res.status(200).json(resp);
}
