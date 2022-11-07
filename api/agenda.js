const fs = require('fs');

const VisitorLogModel = require('../models/visitor_log');
const AgendaModel = require('../models/agenda');
const AgendaLogModel = require('../models/agenda_log');

// import json and populate database
exports.populateAgenda = () => {
    fs.readFile('./data/agenda.json', (err, content) => {
        if (err) return console.log('Error loading agenda data', err);
        let agendas = JSON.parse(content);
        console.log(agendas);
        // Q1.1 fill agenda data into database

    });
}

// show agenda based on location and time
exports.handleAgenda = async (req, res) => {
    var resp = {}

    // Q1.2 extract userId from req.body and find last location in VisitorLog

    if (location) {
        // Q1.3 find one agenda based on location and time

    } else {
        // Q1.4 select one agenda based on time and return to user

    }

    // Q1.5 insert new agenda log into database

    res.status(200).json(resp);
}
