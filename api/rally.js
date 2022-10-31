const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {RallyModel,RallyLogModel} = require('../models/rally_model');

// populate information data
exports.populateRally = () => {
    fs.readFile('./data/rally.json', (err, content) => {
        if (err) return console.log('Error loading rally data', err);
        let rallys = JSON.parse(content);
        console.log(rallys);
        // your code here
    });
}

// record rally activities
exports.handleRally = (req, res) => {
    console.log(req.query);
    console.log(req.body);
    const qr_code_id = req.query.id;
    const qr_code_title = req.query.title;
    const qr_code_desc = req.query.description;
    const qr_code_value = req.query.qrCode;

    const json = {};
    json[qr_code_id] = {
        "title": qr_code_title,
        "description": qr_code_desc,
        "qrCode": qr_code_value   
    }

    fs.readFile('./data/rally.json', async (err, content) => {
        try {
            if (err) return console.log('Error loading rally data', err);
        let rallys = JSON.parse(content);
        if (!(qr_code_id in Object.keys(rallys))) {
            rallys[qr_code_id] = json[qr_code_id];
            const text = JSON.stringify(rallys);
            fs.writeFileSync('./data/rally.json', text, (err) => {
                if (err) return console.log('Error writing rally data');
            })
            res.status(200).json({status:'OK', rally: rallys});
        }} catch (err) {
            console.error(err);
        }
        // your code here
    });
}