const VisitorLogModel = require('../models/visitor_log');
const MapLogModel = require('../models/map_log');
const AgendaLogModel = require('../models/agenda_log');
const InfoLogModel = require('../models/info_log');
const RallyLogModel = require("../models/rally_log");


exports.handleStatus = async (req,res) => {
    var resp = {};

    switch(req.query.mode) {
        case "visitor":
            // Q5.6 generate summary from VisitorLog

            break
        case "map":
            // Q5.7 generate summary from MapLog
            
            break;
        
        case "agenda":
            // Q5.8 generate summary from AgendaLog

            break;
        case "info":
            // Q5.9 generate summary from InfoLog

            break;
        case "rally":
            // Q5.10 generate summary from RallyLog

            break;
        default:
            break;
    }
    res.status(200).json(resp);
}