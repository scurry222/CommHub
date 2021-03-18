const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session')

const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { accountSid, authToken } = require('./twilio.config')

const client = require('twilio')(accountSid, authToken);


app.use('/', express.static(path.join(__dirname, '..', 'client/dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({
    keys:[ accountSid, authToken ],
    maxAge: 24 * 60 * 60 * 1000
}));

server.listen(1337, () => {
    console.log('Server is listening on port 1337');
});

const idToSocketMap = new Map();

app.post('/', (req, res) => {
    const twiml = new MessagingResponse();
    twiml.message(req.body);
    var re = /Body="(\w+)"/
    var body = twiml.response.toString().match(re)
    if (body) {
        res.send(body[1]);
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

io.on('connection', (socket) => {
    console.log('A user connected');
});
