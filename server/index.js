const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookieSession = require('cookie-session');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

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
    console.log(data)
    const body = {content: data[1], time: Date.now(), sendee: data[2], sender: data[3]};
    await controller.searchContacts(body.sender)
        .then(async(found) => {
            if (!found) {
                await controller.addContact(body.sender);
            }
        })
        .then(async() => await controller.findContact(body.sender)
        .then(async(contactId) => {
            body.contactId = contactId
            console.log(body)
            getAPIAndEmit(io, body);
            await controller.addMessage(body);
        }))
        .finally(() => res.send())
        .catch(err => console.error(err));
});

app.post('/sendMessage', async(req, res) => {
    const { messageValue, contactId } = req.body;
    await controller.findContactById(contactId)
        .then(async(number) => {
            console.log('number', number)
            client.messages
            .create({
                body: messageValue,
                from: '+17032910096',
                to: number,
                contactId
            })
            .then(async({body, to, from}) => {
                const removeTrialAccountBS = /Sent from your Twilio trial account - (.*)/
                const content = body.split(removeTrialAccountBS)[1];
                const message = {content, sender: from, sendee: to, contactId, time: Date.now()}
                await controller.addMessage(message);
                getAPIAndEmit(io, message);
            })
        .finally(() => res.send())
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

app.get('/messages/:id', async(req, res) =>{
    await controller.getMessages(req.params.id)
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
});
