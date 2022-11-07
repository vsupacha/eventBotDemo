'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const line = require('@line/bot-sdk');
const ngrok = require('ngrok');

const visitorAPI = require('./api/visitor');
const locationAPI = require('./api/location');
const agendaAPI = require('./api/agenda');
const mapAPI = require('./api/map');
const infoAPI = require('./api/info');
const rallyAPI = require('./api/rally');

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

// populate data into MongoDB
locationAPI.populateLocation();
agendaAPI.populateAgenda();
infoAPI.populateInfo();
mapAPI.populateMap();
rallyAPI.populateRally();

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
            visitorAPI.activateVisitor(event.source.userId);
            return console.log('Got Follow event');
        case 'unfollow':
            visitorAPI.deactivateVisitor(event.source.userId);
            return console.log('Got Unfollow event');
        case 'join':
            return console.log('Got Join event');
        case 'leave':
            return console.log('Got Leave event');
        case 'postback':
            return console.log('Got Postback event');
        case 'beacon':
            if (event.beacon.type === 'enter') {
                const location = locationAPI.lookupBeacon(event.beacon.hwid);
                if (location) {
                    visitorAPI.updateVisitorLog(event.source.userId, location.locationId);
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
    agendaAPI.handleAgenda(req, res);
});

app.get('/api/info', (req,res) => {
    infoAPI.handleInfo(req, res);
});

app.get('/api/map', (req,res) => {
    mapAPI.handleMap(req, res);
});

app.get('/api/rally', (req,res) => {
    rallyAPI.handleRally(req, res);
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
