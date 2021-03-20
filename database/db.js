const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const config = require('../db.config.js');

const program = async() => {
    mysql.createConnection(config);

    const instance = new MySQLEvents(connection, {
        startAtEnd: true // to record only the new binary logs, if set to false or you didn't provide it all the events will be console.logged after you start the app
    })

    await instance.start();

    instance.addTrigger({
        name: 'monitoring all statements',
        expression: 'communications.*',
        statement: MySQLEvents.STATEMENTS.INSERT,
        onEvent: (e) => {
            console.log(e);
        }
    });
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR,console.error);
}

program()
    .catch(console.error);
