const fs = require("fs");

const VisitorLogModel = require('../models/visitor');
const RallyModel = require("../models/rally");
const RallyLogModel = require("../models/rally_log");
const { type } = require("os");


// populate information data
exports.populateRally = () => {
  fs.readFile("./data/rally.json", async (err, content) => {
    if (err) return console.log("Error loading rally data", err);
    let rallys = JSON.parse(content);
    console.log(rallys);
    // Q4.1 fix bug in old code
    for (let key in Object.keys(rallys)) {
      let data = Object.values(rallys)[key]
      await RallyModel.create({
        rallyId: Object.keys(rallys)[key],
        rallyTitle: data.title,
        rallyDesc: data.description,
        qrCode: data.qrCode,
      });
      // console.log("data : ")
      // console.log(Object.values(rallys)[key])
      // console.log(Object.keys(rallys)[key])

      
    }
    /*
    OLD code with bug
    for (let key in Object.keys(rallys)) {
      await RallyModel.create({
        rallyId: key,
        rallyTitle: rallys.key.title,
        rallyDesc: rallys.key.description,
        qrCode: rallys.key.qrCode,
      });
    }
    */
  });
};

// record rally activities
exports.handleRally = async (req, res) => {
  let msg = {};

  if (req.query.userId === undefined) {
    // Q4.3 return all Rally to populate UI

  } else {
    if (req.query.qr_value === undefined) {
      // Q4.4 generate summary of finished rallyId from RallyLog

    } else {
      // Q4.5 query VisitorLog for latest location

      // Q4.6 use combined conditions (qr_value and locationId) to find the rallyId

      // Q4.7 query RallyLog to find all rallyId and generate summary

      // Q4.8 record new rallyId into RallyLog

    }
  }
  /*
  OLD CODE
  const uid = req.query.uid;
  const qr_code_value = req.query.qrCode;
  const rally = RallyModel.findOne({ qrCode: qr_code_value });
  if (rally) {
    const rallyLog = RallyLogModel.findOne({
      userId: uid,
      rallyId: rally.rallyId,
    });
    const visitor = VisitorModel.findOne({ userId: uid });
    const visitorLog = VisitorLogModel.findOne({ userId: uid })
    if (visitor.userStatus && visitorLog && !rallyLog) {
      await RallyLogModel.create({
        userId: uid,
        rallyId: qr_code_id,
        createdAt: Date.now(),
      });
    }
  }
  const allStamp = RallyModel.find({});
  const userStamp = RallyLogModel.find({ userId: uid });

  if (allStamp.length == userStamp.length) {
    msg.notification = "Congrate! You get all stamp. It's your token.";
  }
  */
  res.status(200).json(msg);
};
