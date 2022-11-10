'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const line = require('@line/bot-sdk');
const ngrok = require('ngrok');

const locationAPI = require('./api/location');
const visitorAPI = require('./api/visitor');
const mapAPI = require('./api/map');
const agendaAPI = require('./api/agenda');
const infoAPI = require('./api/info');
const rallyAPI = require('./api/rally');
const mockTest = require('./test/mock');

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

app.get('/api/location', (req,res) => {
    console.log("/api/location request query: ", req.query);
    console.log("/api/location request body: ", req.body);
    locationAPI.handleLocation(req, res);
});

app.get('/api/visitor', (req,res) => {
    console.log("/api/visitor request query: ", req.query);
    console.log("/api/visitor request body: ", req.body);
    visitorAPI.handleVisitor(req, res); 
});

app.get('/api/map', (req,res) => {
    console.log("/api/map request query: ", req.query);
    console.log("/api/map request body: ", req.body);
    mapAPI.handleMap(req, res);
});

app.get('/api/agenda', (req,res) => {
    console.log("/api/agenda request query: ", req.query);
    console.log("/api/agenda request body: ", req.body);
    agendaAPI.handleAgenda(req, res);
});

app.get('/api/info', (req,res) => {
    console.log("/api/info request query: ", req.query);
    console.log("/api/info request body: ", req.body);
    infoAPI.handleInfo(req, res);
});

app.get('/api/rally', (req,res) => {
    console.log("/api/rally request query: ", req.query);
    console.log("/api/rally request body: ", req.body);
    rallyAPI.handleRally(req, res);
});

// API test

app.get('/test/inject', (req, res) => {
    console.log("/test/inject request query: " + req.query);
    console.log("/test/inject request body: " + req.body);
    var resp = {status:"ok"};
    
    if (Object.keys(req.query).length > 0) {
        const type = req.query['type'];
        switch(type) {
            case 'VisitorLog':
                mockTest.injectVisitorLog(req.query.userId, req.query.locationId);
                break;
            case 'AgendaLog':
                mockTest.injectAgendaLog(req.query.userId, req.query.agendaId);
                break;
            case 'InfoLog':
                mockTest.injectInfoLog(req.query.userId, req.query.infoId);
                break;
            case 'MapLog':
                mockTest.injectMapLog(req.query.userId, req.query.locationId);
                break;
            case 'RallyLog':
                mockTest.injectRallyLog(req.query.userId, req.query.rallyId);
                break;
            default:
                console.log('Unknown type');
                resp["status"] = "Unknown type";
        }
    } else {
        console.log('No query params');
        resp["status"] = "No query params";
    }
    res.status(200).json(resp);
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
