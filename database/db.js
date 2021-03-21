const { MySQL } = require('mysql-promisify');
const { createConnection } = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

const config = require('../db.config.js');

const db = new MySQL(config);

const addContact = async(number, name) =>
    await db.query({
        sql: `
            INSERT INTO contacts (number, name) VALUES (:number, :name)
        `,
        params: {
            number, name
        }   
    });

const addMessage = async({ body, time, to, from, contactId }) =>
    await db.query({
        sql: `
            INSERT INTO messages
            (content, time, sender, sendee, contact_id)
            VALUES
            (:body, :time, :to, :from, :contactId)
        `,
        params: {
            body, time, to, from, contactId
        }
    });

const getMessages = async() => 
    await db.query({
        sql: `
            SELECT * FROM messages WHERE contacts.contact_id = messages.message_id ORDER BY time
        `
    });

const searchContacts = async(number) =>
    await db.query({
        sql: `
            SELECT EXISTS (SELECT * from contacts WHERE contacts.number = :number)
        `,
        params: {
            number
        }
    });

const findContact = async(number) =>
    await db.query({
        sql: `
            SELECT * FROM contacts WHERE contacts.number = :number
        `,
        params: {
            number
        }
    });

const watch = async() => {
    const instance = new MySQLEvents(createConnection(config), {
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
    instance.on(MySQLEvents.EVENTS.db_ERROR, console.error);
}

module.exports = {
    watch,
    addMessage,
    addContact,
    searchContacts,
    findContact,
    getMessages,
};
