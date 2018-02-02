﻿'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const apiaiApp = apiai("1c5c2bd1f8b548b18f3782ca17420f2c");

//To handle the response to bot
app.post('/ai', (req, res) => {
    console.log('*** Inside service now request ***');
    console.log(req.body.result);

    if (req.body.result.action === 'input.welcome') {
        console.log('Inside Welcome intent');
        /*let msg = 'Hi welcome';
        return res.json({
            speech: msg,
            displayText: msg,
            source: 'reportIncidentBot'
        });*/
        let content = `Hi, welcome to incident Report Bot. I can help you with the following.<br/>1) To report an incident in your organization<br/>2) To view the status of the incidents<br/>3) Add comments to the incidents<br/>Please select any one of the following to continue`;
        return res.json({
            speech: '',
            displayText: "Hi, welcome to incident Report Bot",
            data: {
                "facebook": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [
                                {
                                    "title": "Report Incident Bot",
                                    "subtitle": content,
                                    "buttons": [
                                        {
                                            "type": "postback",
                                            "title": "Report Incident",
                                            "payload": "report_incident"
                                        },
                                        {
                                            "type": "postback",
                                            "title": "My Incidents",
                                            "payload": "my_incidents"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            source: 'reportIncidentBot'
        });
    } else {
        console.log('Other than welcome intent');
        let msg = "Can't understand";
        return res.json({
            speech: msg,
            displayText: msg,
            source: 'reportIncidentBot'
        });
    }
});