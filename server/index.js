const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const bodyParser = require('body-parser');
const path = require('path');

const { getAPIAndEmit } = require('./smsHelpers.js');
const db = require('../database/db.js');
const controller = require('./controllers/commController.js')

const { accountSid, authToken } = require('../twilio.config.js')
const client = require('twilio')(accountSid, authToken);

db.watch();

app.use('/', express.static(path.join(__dirname, '..', 'client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    keys:[ accountSid, authToken ],
    maxAge: 24 * 60 * 60 * 1000
}));

server.listen(1337, () => {
    console.log('Server is listening on port 1337');
});


app.post('/', async(req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(req.body);
    const re = /^.*?Body="(\w+)".*?To="(\+\w+)".*?From="(\+\w+)"/
    const data = twiml.response.toString().split(re)
    const body = {body: data[1], time: Date.now(), to: data[2], from: data[3]};
    // console.log(twiml.response.toString())
    console.log(body);
    if (body) {
        getAPIAndEmit(io, body);
        await controller.addMessage(body, res);
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

app.get('/messages', async(req, res) => await controller.getMessages(res));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => console.log('user disconnected'));
});
