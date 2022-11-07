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
exports.queryVisitorLog = async (userId) => {
    const visitor_log = await VisitorLogModel.findOne().sort({ createdAt: -1 });
    if (visitor_log) {
        return visitor_log.locationId;
    }
    return null;
}