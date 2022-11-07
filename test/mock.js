const VisitorLogModel = require('../models/visitor_log');
const AgendaLogModel = require('../models/agenda_log');
const InfoLogModel = require('../models/info_log');
const MapLogModel = require('../models/map_log');
const RallyLogModel = require('../models/rally_log');


// inject VisitorLog
exports.injectVisitorLog = async (userId, locationId) => {
    await VisitorLogModel.create({
        userId: userId,
        locationId: locationId,
        createdAt: Date.now()
    });
}

// inject AgendaLog
exports.injectAgendaLog = async (userId, agendaId) => {

}

// inject InfoLog
exports.injectInfoLog = async (userId, infoId) => {

}

// inject MapLog
exports.injectMapLog = async (userId, locationId) => {

}

// inject RallyLog
exports.injectRallyLog = async (userId, rallyId) => {
    
}