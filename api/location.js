const fs = require('fs');

const LocationModel = require('../models/location');

// import json and populate database
exports.populateLocation = async() => {
    fs.readFile('./data/location.json', (err, content) => {
        if (err) return console.log('Error loading location data', err);
        let locations = JSON.parse(content);
        console.log(locations);
        for (const id in locations) {
            console.log(id);
            (async () => {
                console.log(locations[id]);
                console.log(LocationModel)
                await LocationModel.findOneAndUpdate(
                    { locationId: id },
                    { 
                        locationName: locations[id].name, 
                        locationLat: locations[id].lat,
                        locationLon: locations[id].lon,
                        locationBeacon: locations[id].beacon,
                        updatedAt: Date.now() 
                    },
                    { upsert: true }
                );
                console.log('Location data updated');
            })();
        }
    });
}

// lookup location by beacon
exports.lookupBeacon = async (hwid) => {
    const location = await LocationModel.findOne({ locationBeacon: hwid });
    return location;
}

// lookup location by lat/lon
exports.lookupGeolocation = (lat, lon) => {

}

// handle location request
exports.handleLocation = async (req, res) => {
    var resp;

    if (Object.keys(req.query).length > 0) {
        resp = await LocationModel.findOne({"locationId": req.query['locationId']});
    } else {
        const docs = await LocationModel.find({});
        resp = docs.map(doc => {
            const obj = {};
            obj[doc.locationId] = doc.locationName;
            return obj;
        });
    }
    console.log(resp)
    res.status(200).json(resp);
}