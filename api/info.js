const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {InfoModel,InfoLogModel} = require('../models/info_model');


var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;


// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        // your code here

        MongoClient.connect(url,function(err, db) {
            if (err) throw err;
            var dbo = db.db("eventbotdemo");
            var num_obj =0
            var collection =  dbo.collection("infos")
            for (let key in infos){
                var myobj = { 
                    infoId:infos[key],
                    infoTitle: infos[key]['title'], 
                    infoDesc: infos[key]['description'], 
                    locationId: infos[key]['location'],
                };
                collection.insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    num_obj = num_obj + 1;
                });
            }
            console.log('inserted data to infos table');
        });
    });
}

// search for information related to keywords
exports.handleInfo = (req, res) => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) {
            console.log('Error loading info data', err);
            res.status(500).json({status:'Error loading info data'});
        }
        let infos = JSON.parse(content);
        output = search(infos, req.query)
        console.log(output);
        // TEST INSERT DATA
        if(output[0] == true){

            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("eventbotdemo");
                var myobj = { 
                    name: req.query.name, 
                    tel: req.query.tel, 
                    email: req.query.email,
                    search: output[2].toString(),
                };
    
                dbo.collection("infologs").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                });
            });
        }
        res.status(200).json({status:'OK',output:output[1]});
    });
}


function search(data, search_text) {
    var results = {};
    var list_title_found =[];
    search_text = search_text.search.toUpperCase();
    for (let key in data){
        if (key && data[key]['title'] &&data[key]['title'].toUpperCase().indexOf(search_text) !== -1) {
            results[key] = data[key]
            list_title_found.push(key)
            console.log(results)
        }
    }
    return [true,results,list_title_found];
}