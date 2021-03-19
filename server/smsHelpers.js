const { ModuleFilenameHelpers } = require('webpack');
const { accountSid, authToken } = require('../twilio.config')

const client = require('twilio')(accountSid, authToken);

// communication channel between client and server
const getAPIAndEmit = (socket, sms) => {
  socket.emit("FromAPI", sms);
}

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+17032910096',
//      to: '+15104326301'
//    })
//   .then(message => console.log(message.sid));

module.exports = { getAPIAndEmit };