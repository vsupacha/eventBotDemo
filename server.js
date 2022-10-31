'use strict';

const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const line = require('@line/bot-sdk');
const ngrok = require('ngrok');
const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('./models/visitor_model');

const agendaObj = require('./api/agenda');
const mapObj = require('./api/map');
const infoObj = require('./api/info');
const rallyObj = require('./api/rally');

require('dotenv').config();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';
const line_cfg = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CH_SECRET,
};

// App
const app = express();

app.use('/liff', express.static('liff'));

// MongoDB via Mongoose
mongoose.connect(process.env.MONGODB_URI, {autoIndex: true});
// populate location data
fs.readFile('./data/location.json', (err, content) => {
    if (err) return console.log('Error loading location data', err);
    let locations = JSON.parse(content);
    console.log(locations);
    // your code here
    for (const id in locations) {
        console.log(id);
        (async () => {
            console.log(locations[id]);
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

agendaObj.populateAgenda();
infoObj.populateInfo();
mapObj.populateMap();
rallyObj.populateRally();

// LINE
const lineClient = new line.Client(line_cfg);

app.post('/callback', line.middleware(line_cfg), (req, res) => {
    Promise.all(req.body.events.map(handleEvent))
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        }
    );
});

async function handleEvent(event) {
    console.log(event);
    switch(event.type) {
        case 'message':
            const message = event.message;
            switch (message.type) {
                case 'text':
                    const echo = { type: 'text', text: event.message.text };
                    return lineClient.replyMessage(event.replyToken, echo);
                case 'image':
                    return console.log('Got Image message');
                case 'video':
                    return console.log('Got Video message');
                case 'audio':
                    return console.log('Got Audio message');
                case 'location':
                    return console.log('Got Location message');
                case 'sticker':
                    return console.log('Got Sticker message');
                default:
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }
            break;
        case 'follow':
            await VisitorModel.findOneAndUpdate(
                { userId: event.source.userId },
                { userStatus: true, updatedAt: Date.now() },
                { upsert: true }
            )
            return console.log('Got Follow event');
        case 'unfollow':
            await VisitorModel.updateOne(
                { userId: event.source.userId }, 
                { userStatus: false, updatedAt: Date.now() }
            ).lean();
            return console.log('Got Unfollow event');
        case 'join':
            return console.log('Got Join event');
        case 'leave':
            return console.log('Got Leave event');
        case 'postback':
            return console.log('Got Postback event');
        case 'beacon':
            if (event.beacon.type === 'enter') {
                const location = await LocationModel.findOne({ locationBeacon: event.beacon.hwid });
                if (location) {
                    console.log(location);
                    await VisitorLogModel.create({
                        userId: event.source.userId,
                        locationId: location.locationId,
                    });
                }
            }
            return console.log('Got Beacon event');
        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
  
    return Promise.resolve(null);
}

// API
app.use(bodyParser.json());

app.get('/api/agenda', (req,res) => {
    agendaObj.handleAgenda(req, res);
});

app.get('/api/info', (req,res) => {
    infoObj.handleInfo(req, res);
});

app.get('/api/map', (req,res) => {
    mapObj.handleMap(req, res);
});

app.get('/api/rally', (req,res) => {
    rallyObj.handleRally(req, res);
});

// Runtime
app.listen(PORT, () => {
    if (process.env.RUNTIME_MODE == 'DEV_NGROK') {
        console.log("Connecting to ngrok...")
        ngrok.connect({addr: PORT, authtoken: process.env.NGROK_AUTH_TOKEN}).then(url => {
            console.log('listening on ' + url + '/callback');
            lineClient.setWebhookEndpointUrl(url + '/callback');
        }).catch(console.error);
    } else {
        console.log('listening on ' + PORT);
    }
});
