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
            if(AgendaLogModel.find() == null){
                console.log('Query Data Error');
            }
            else{
                resp = await AgendaLogModel.find({});
                if(resp.length == 0){
                    console.log('Data in agenda_logs is empty');
                }else{
                    console.log('Data in agenda_logs collection : ',resp.length);
                }
            }
            break;
        case "info":
            // Q5.9 generate summary from InfoLog
            if(InfoLogModel.find() == null){
                console.log('Query Data Error');
            }
            else{
                resp = await InfoLogModel.find({});
                if(resp.length == 0){
                    console.log('Data in info_logs is empty');
                }else{
                    console.log('Data in info_logs collection : ',resp.length);
                }
            }
            break;
        case "rally":
            // Q5.10 generate summary from RallyLog
            if(RallyLogModel.find() == null){
                console.log('Query Data Error');
            }
            else{
                resp = await RallyLogModel.find({});
                if(resp.length == 0){
                    console.log('Data in rally_logs is empty');
                }else{
                    console.log('Data in rally_logs collection : ',resp.length);
                }
            }
            break;
        default:
            break;
    }
  
    console.log(resp)
    res.status(200).json(resp);
    return resp
}