const fs = require('fs');

const {VisitorModel,LocationModel,VisitorLogModel} = require('../models/visitor_model');
const {InfoModel,InfoLogModel} = require('../models/info_model');

// populate information data
exports.populateInfo = () => {
    fs.readFile('./data/info.json', (err, content) => {
        if (err) return console.log('Error loading info data', err);
        let infos = JSON.parse(content);
        console.log(infos);
        // your code here
    });
}

// search for information related to keywords
exports.handleInfo = (req, res) => {
    console.log(req.query);
    // console.log(req.body);
    fs.readFile('./data/info.json', (err, content) => {
        if (err) {
            console.log('Error loading info data', err);
            res.status(500).json({status:'Error loading info data'});
        }
        let infos = JSON.parse(content);
        // console.log(infos);
        output = find(infos, req.query)
        if (output[0] == true){
            res.status(200).json({status:'OK',output:JSON.stringify(infos[output[1]])});
            console.log('1')
        }
        else{
            output = search(infos, req.query)
            res.status(200).json({status:'OK',output:JSON.stringify(output)});
            console.log('2')
        }
    });

    
}

function find(data, text) {
    text = text.search.toUpperCase();
    for (let key in data){
        if (data[key]['title'].toUpperCase() == text) {
            console.log('found')
            return [true,key];
        }
        else{
            console.log('Not found');
            return [false,'']
        }
    }
}

function search(data, search_text) {
    var results = [];
    search_text = search_text.search.toUpperCase();
    for (let key in data){
        if (key && data[key]['title'] &&data[key]['title'].toUpperCase().indexOf(search_text) !== -1) {
            results.push(data[key]['title'])
            console.log(results)
        }
    }
    return results;
}