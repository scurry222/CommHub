const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const bodyParser = require('body-parser');
const path = require('path');

const { getAPIAndEmit } = require('./smsHelpers.js');
const controller = require('./controllers/commController.js')

const { accountSid, authToken } = require('../twilio.config.js');
const client = require('twilio')(accountSid, authToken);

app.use('/', express.static(path.join(__dirname, '..', 'client/dist')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
    await controller.searchContacts(body.from)
        .then(async(found) => {
            if (!found) {
                await controller.addContact(body.from);
            }
        })
        .then(async() => await controller.findContact(body.from)
        .then(async(contactId) => {
            body.contactId = contactId
            console.log(body)
            getAPIAndEmit(io, body);
            await controller.addMessage(body);
        }))
        .finally(() => res.send())
        .catch(err => console.error(err));
});

app.post('/send_sms', async(req, res) => {
    const { message, to, from } = req.body;
    client.messages
        .create({
            body: `${message}`,
            from: `${from}`,
            to: `${to}`
        })
        .then(async(message) => {
            await controller.searchContacts(message.to)
        .then(async(found) => {
            if (!found) {
                await controller.addContact(message.to);
            }
        })
        .then(async() => await controller.findContact(message.to)
        .then(async(contactId) => {
            message.contactId = contactId
            console.log(message)
            getAPIAndEmit(io, message);
            await controller.addMessage(message);
        }))
        .finally(() => res.send(message.sid))
        .catch(err => console.error(err));
        });
});

app.get('/contacts', async(req, res) =>
    await controller.getContacts()
        .then((result) => res.send(result))
        .catch(err => console.error(err))
);

app.post('/contacts', async(req, res) => {
    const {number, name} = req.body;
    console.log(number, name)
    await controller.addContact(number, name)
        .then(result => res.send(result))
        .catch(err => console.error(err))
});

app.get('/messages/:contactId', async(req, res) =>
    await controller.getMessages(req.params.contactId)
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => console.log('user disconnected'));
});
