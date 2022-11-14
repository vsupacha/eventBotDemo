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
        // Q2.1 fill agenda data into database
        for (const id in agendas) {
            console.log(id);
            (async () => {
                console.log(agendas[id]);
                console.log(AgendaModel)
                await AgendaModel.findOneAndUpdate(
                    { eventId: id },
                    { 
                        eventTitle: agendas[id].title, 
                        eventDesc: agendas[id].description,
                        locationId: agendas[id].location,
                        eventStart: agendas[id].start,
                        eventEnd: agendas[id].end,
                        updatedAt: Date.now() 
                    },
                    { upsert: true }
                );
                console.log('Agenda data updated');
            })();
        }

    });
}

// show agenda based on location and time
exports.handleAgenda = async (req, res) => {
    var resp = {}

    // Q2.2 extract userId from req.query and find last location in VisitorLog
    let location = await VisitorLogModel.findOne({ userId: req.query['userId'] }, null, { sort: { createdAt: -1 } })

    if (location) {
        // Q2.3 find one agenda based on location and time
        let agenda = await AgendaModel.findOne({ 
            location: location.locationId, 
            eventStart: {
                $regex: new Date(parseInt(location.createdAt)).toISOString().substring(0, 14)
            }
        });
        resp = agenda;
        
    } else {
        // Q2.4 select one agenda based on time and return to user
        let agenda = await AgendaModel.find({
            eventStart: {
                $regex: new Date(parseInt(location.createdAt)).toISOString().substring(0, 14)
            }
        });
        const random = Math.floor(Math.random() * agenda.length);
        resp = agenda[random];
    }

    // Q2.5 insert new agenda log into database
    for (const id in agendas) {
        console.log(id);
        (async () => {
            console.log(agendas[id]);
            await 
                AgendaLogModel.create({
                userId: userId,
                eventId: id,
                createdAt: Date.now()
            });
            
            console.log('AgendaLog data created');
        })();
    }
    res.status(200).json(resp);
}
