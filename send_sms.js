const { accountSid, authToken } = require('./twilio.config')

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+17032910096',
     to: '+15104326301'
   })
  .then(message => console.log(message.sid));