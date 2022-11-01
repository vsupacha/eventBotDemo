const fs = require('fs');

const {VisitorModel, LocationModel, VisitorLogModel} = require('../models/visitor_model');
const {MapLogModel} = require('../models/map_model');

var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI;

// populate database with JSON data
exports.populateMap = () => {
    
    fs.readFile('./data/location.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let location = JSON.parse(content);
        // your code here

        MongoClient.connect(url,function(err, db) {
            if (err) throw err;
            var dbo = db.db("eventbotdemo");
            var obj_count =0
            var collection =  dbo.collection("location")
            for (let key in location){
                var loc_obj = { 
                    //location: location[key],
                    location_name: location[key]['name'], 
                    location_lat: location[key]['lat'], 
                    location_lon: location[key]['lon'],
                    location_beacon: location[key]['beacon'],
                };
                collection.insertOne(loc_obj, function(err, res) {
                    if (err) throw err;
                    obj_count = obj_count + 1;
                });
                console.log('test obj',loc_obj)

            }
            console.log('inserted data to MapLoc table');
        });
    });
}


// generate location over map
exports.handleMap = (req, res) => {
    console.log("request query",req.query);
    console.log("request body",req.body);
        
            MongoClient.connect(url, function(err, db) {
                if (err) throw err;
                var dbo = db.db("eventbotdemo");
                var locLog = { 
                    
                    fromLoc: req.query.from, 
                    toLoc: req.query.where, 
                    createdAt: Date.now(),
                };
    
                dbo.collection("MapLog").insertOne(locLog, function(err, res) {
                    if (err) throw err;
                    console.log("insert data in mapLog");
                    db.close();
                });
                console.log("insert",locLog);
            });
        
        res.status(200).json({status:'OK'});
    
    
}
    
    

        