const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { accountSid, authToken } = require('./twilio.config')
const MessageList = require('../database/database.js');

const client = require('twilio')(accountSid, authToken);

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));

const db = new MessageList();

app.post('/', (req, res) => {
    console.log(db)
    const twiml = new MessagingResponse();
    twiml.message(req.body);
    var re = /Body="(\w+)"/
    var body = twiml.response.toString().match(re)
    if (body) {
        db.push(body[1])
        res.send(db);
    }
    res.send();
});

app.post('/send_sms', (req, res) => {
    client.messages
        .create({
            body: `${req.body}`,
            from: '+17032910096',
            to: '+15104326301'
        })
        .then(message => res.send(message.sid));
})

http.createServer(app).listen(1337, () => {
    console.log('Server is listening on port 1337');
})
