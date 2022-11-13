const VisitorLogModel = require('../models/visitor_log');
const MapLogModel = require('../models/map_log');
const AgendaLogModel = require('../models/agenda_log');
const InfoLogModel = require('../models/info_log');
const RallyLogModel = require("../models/rally_log");


exports.handleStatus = async (req, res) => {
    var resp = {};

    switch (req.query.mode) {
        case "visitor":
            // Q5.6 generate summary from VisitorLog
            resp = await VisitorLogModel.find({},{__v: 0});

            break
        case "map":
            // Q5.7 generate summary from MapLog
            resp = await MapLogModel.find({},{__v: 0});

            break;
        case "agenda":
            // Q5.8 generate summary from AgendaLog
            resp = await AgendaLogModel.find({},{__v: 0});

            break;
        case "info":
            // Q5.9 generate summary from InfoLog
            resp = await InfoLogModel.find({},{__v: 0});

            break;
        case "rally":
            // Q5.10 generate summary from RallyLog
            resp = await RallyLogModel.find({},{__v: 0});

            break;
        default:
            break;
    }
  
    console.log(resp)
    res.status(200).json(resp);
    return resp
}