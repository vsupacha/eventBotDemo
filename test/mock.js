const VisitorLogModel = require('../models/visitor_log');
const AgendaLogModel = require('../models/agenda_log');
const InfoLogModel = require('../models/info_log');
const MapLogModel = require('../models/map_log');
const RallyLogModel = require('../models/rally_log');
const info_log = require('../models/info_log');

// วิธีการเช็คว่า Inject เข้าหรือไม่
// *เข้า docker
// *เปิด terminal mongodb
// *ใช้ command 
// -bash
// -mongosh 
// -use eventbotdemo
// -db.<ชื่อcollection>.find({})


// inject VisitorLog
//Example : http://localhost/test/inject?type=VisitorLog&userId=value1&locationId=value2
exports.injectVisitorLog = async (userId, locationId) => {
    await VisitorLogModel.create({
        userId: userId,
        locationId: locationId,
        createdAt: Date.now()
    });
}

// inject AgendaLog
//Example : http://localhost/test/inject?type=AgendaLog&userId=value1&eventId=value2
exports.injectAgendaLog = async (userId, eventId) => {
    await AgendaLogModel.create({
        userId: userId,
        eventId: eventId,
        createdAt: Date.now()
    });

}

// inject InfoLog
// Example : http://localhost/test/inject?type=InfoLog&userId=value1&infoId=value2&name=value3&tel=value4&email=value5&search=value6
exports.injectInfoLog = async (userId, infoId, name, tel, email, search) => {
    await info_log.create({
        userId: userId,
        infoId: infoId,
        name: name,
        tel: tel,
        email: email,
        search: search,
        createdAt: Date.now()
    });
}

// inject MapLog
//Example http://localhost/test/inject?type=MapLog&userId=value1&fromLoc=value2&toLoc=value3
exports.injectMapLog = async (userId, fromLoc, toLoc,) => {
    await MapLogModel.create({
        userId: userId,
        fromLoc: fromLoc,
        toLoc: toLoc,
        createdAt: Date.now()
    });
}

// inject RallyLog
//Example : http://localhost/test/inject?type=RallyLog&userId=value1&rallyId=value2
exports.injectRallyLog = async (userId, rallyId) => {
    await RallyLogModel.create({
        userId: userId,
        rallyId: rallyId,
        createdAt: Date.now()
    });
    
}