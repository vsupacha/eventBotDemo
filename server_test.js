'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.get('/api/status', (req,res) => {
    console.log("/api/status request query: ", req.query);
    console.log("/api/status request body: ", req.body);
    statusAPI.handleStatus(req, res);
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
                mockTest.injectAgendaLog(req.query.userId, req.query.eventId);
                break;
            case 'InfoLog':
                mockTest.injectInfoLog(req.query.userId, req.query.infoId, req.query.name, req.query.tel, req.query.email, req.query.search);
                break;
            case 'MapLog':
                mockTest.injectMapLog(req.query.userId, req.query.fromLoc, req.query.toLoc);
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
    console.log('listening on ' + PORT);
});
