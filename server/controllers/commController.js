const db = require('../../database/db.js');

const addMessage = async(body, res) => {
    await db.addMessage(body)
        .then(() => res.status(200).send())
        .catch((err) => res.status(400).send(err));
}

const getMessages = async(res) => {
    await db.getMessages((err, data) => err ? res.status(400).send(err) : res.status(200).send(data));
        // .then((data) => {console.log(data); res.status(200).send(data)})
        // .catch(err => res.status(400).send(err));
}

module.exports = {
    addMessage,
    getMessages
}
