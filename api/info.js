const fs = require('fs');

const VisitorLogModel = require('../models/visitor_log');
const InfoModel = require('../models/info');
const ContactModel = require('../models/contact');
const InfoLogModel = require('../models/info_log');


// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        // Q3.1 fill info data into database (Mongoose style)
        console.log(infos);
        for (const id in infos) {
            console.log(id);
            (async () => {
                console.log(infos[id]);
                console.log(InfoModel)
                await InfoModel.findOneAndUpdate(
                    { infoId: id },
                    {
                        infoTitle: infos[id].title,
                        infoDescription: infos[id].description,
                        infoLocation: infos[id].location,
                        updatedAt: Date.now()
                    },
                    { upsert: true }
                );
                console.log('Info data updated');
            })();
        }
    });
}

// search for information related to keywords
exports.handleInfo = async (req, res) => {
    var resp = {};
    var output = {};
    // Q3.2 extract userId and keywords (as Array) from req.query 
    if (req.query.keywords) {
        var keywords = req.query.keywords.split(',');
    }
    if (req.query.userId) {
        var userId = req.query.userId;
    }

    // console.log(keywords);
    if (keywords) {
        // Q3.3 find all info related to keywords (use regex in Mongoose criteria) 
        for (const id in keywords) {
            output[keywords[id]] = await InfoModel.find({ infoTitle: { $regex: "(?i)" + keywords[id] + "(?-i)" } });
        };
        console.log(output);
        // Q3.4 aggreate multiple info as one if multiple keywords are provided
        var temp = [];
        for (const key in output) {
            for (const index in output[key]) {
                temp.push(output[key][index]);
            }
        }
        resp = temp;
        // Q3.5 insert new info log into database
        InfoLogModel.create({
            keywords: keywords,
            userId: userId
        });

    }
    else {
        // Q3.6 get name/phone/email from req.query
        if (req.query.name) {
            var name = req.query.name;
        }
        if (req.query.phone) {
            var phone = req.query.phone;
        }
        if (req.query.email) {
            var email = req.query.email;
        }


        // Q3.7 add new contact into database
        ContactModel.create({
            name: name,
            phone: phone,
            email: email
        });

    }

    res.status(200).json(resp);
}
