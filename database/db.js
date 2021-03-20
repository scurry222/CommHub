const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const config = require('../db.config.js');

const connection = mysql.createConnection(config);

const addMessage = async({ body, time, to, from }) => {
    const q = 'INSERT INTO messages (content, time, sender, sendee) VALUES (?, ?, ?, ?)';
    await connection.query(q, [body, time, to, from]);
};

const getMessages = async(callback) => {
    const q = 'SELECT * FROM messages';
    await connection.query(q, (err, result) => err ? callback(err) : callback(result));
}

const watch = async() => {
    const instance = new MySQLEvents(connection, {
        startAtEnd: true // to record only the new binary logs, if set to false or you didn't provide it all the events will be console.logged after you start the app
    })

    await instance.start();

    instance.addTrigger({
        name: 'monitoring all statements',
        expression: 'communications.*',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (e) => {
            console.log('hello', e);
        }
    });
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
}

module.exports = {
    watch,
    addMessage,
    getMessages,
};
