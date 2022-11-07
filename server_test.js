'use strict';

const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const line = require('@line/bot-sdk');

const visitorAPI = require('./api/visitor');
const locationAPI = require('./api/location');
const mapAPI = require('./api/map');
/*
const agendaAPI = require('./api/agenda');
const infoAPI = require('./api/info');
const rallyAPI = require('./api/rally');
*/
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
//agendaAPI.populateAgenda();
//infoAPI.populateInfo();
//rallyAPI.populateRally();

// API
app.use(bodyParser.json());

app.get('/api/location', (req,res) => {
    locationAPI.handleLocation(req, res);
});

app.get('/api/map', (req,res) => {
    mapAPI.handleMap(req, res);
});

/*
app.get('/api/agenda', (req,res) => {
    agendaAPI.handleAgenda(req, res);
});

app.get('/api/info', (req,res) => {
    infoAPI.handleInfo(req, res);
});

app.get('/api/rally', (req,res) => {
    rallyAPI.handleRally(req, res);
});
*/

// API test
app.get('/test/inject', (req, res) => {
    console.log('Query params:' + req.query);
    console.log('Body params:' + req.body);
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
    console.log('listening on ' + PORT);
});