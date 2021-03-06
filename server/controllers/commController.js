const db = require('../../database/db.js');

const addMessage = async(body) =>
    await db.addMessage(body)
        .then(result => result);

const addContact = async(number, name) =>
    await db.addContact(number, name)
        .then(result => result);

const searchContacts = async(number) =>
    await db.searchContacts(number)
        .then(exists => Object.values(exists.results[0])[0] === 0 ? false : true);

const findContact = async(number, name) =>
    await db.findContact(number, name)
        .then(result => result.results[0].id);

const findContactById = async(contactId) =>
    await db.findContactById(contactId)
        .then(result => result.results[0].number);

const getMessages = async(contactId) =>
    await db.getMessages(contactId)
        .then(result => result.results);

const getContacts = async() =>
    await db.getContacts()
        .then(result => result.results);

module.exports = {
    addMessage,
    addContact,
    searchContacts,
    findContact,
    findContactById,
    getMessages,
    getContacts,
}
