const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {AgendaModel,AgendaLogModel} = require('../models/agenda_model');

// import json and populate database
exports.populateAgenda = () => {
    fs.readFile('./data/agenda.json', (err, content) => {
        if (err) return console.log('Error loading agenda data', err);
        let agendas = JSON.parse(content);
        console.log(agendas);
        // your code here
    });
}

// show agenda based on location and time
exports.handleAgenda = (req, res) => {
    console.log(req.query);
    console.log(req.body);

    // your code here
    res.status(200).json({status:'OK'});
}
