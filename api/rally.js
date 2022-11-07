const fs = require("fs");

const {
  VisitorModel,
  LocationModel,
  VisitorLogModel,
} = require("../models/visitor");
const { RallyModel, RallyLogModel } = require("../models/rally");

// populate information data
exports.populateRally = () => {
  fs.readFile("./data/rally.json", async (err, content) => {
    if (err) return console.log("Error loading rally data", err);
    let rallys = JSON.parse(content);
    console.log(rallys);
    for (let key in Object.keys(rallys)) {
      await RallyModel.create({
        rallyId: key,
        rallyTitle: rallys.key.title,
        rallyDesc: rallys.key.description,
        qrCode: rallys.key.qrCode,
      });
    }
    // your code here
  });
};

// record rally activities
exports.handleRally = async (req, res) => {
  let msg = { status: "OK" };
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
  res.status(200).json(msg);

  // your code here
};
