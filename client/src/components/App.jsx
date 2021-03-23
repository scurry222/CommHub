import React, {useState, useEffect} from 'react';
import ContactList from './ContactList.jsx';
import MessageArea from './MessageArea.jsx';
import TextInput from './TextInput.jsx';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:1337';

const App = () => {
    const [ messages, setMessages ] = useState([]);
    const [ contactId, setContactId ] = useState(0);
    const [ contacts, addContact ] = useState([]);

    useEffect(() => {
        getContacts();

        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', ({ contactId }) => {
            getContacts();
            getMessagesWithContact(contactId);
        });
    }, [contactId, messages])

    const getContacts = () =>
        axios.get('/contacts')
            .then(({ data }) => addContact(data))

    const getMessagesWithContact = (id) => {
        axios.get(`/messages/${id}`)
            .then(({ data }) => setMessages(data))}

    const postContact = ({number, name}) =>
        axios.post('/contacts', {number, name})
            .then(() => getContacts())

    return (
        <>
            <ContactList contacts={contacts} postContact={postContact} setContactId={setContactId} getMessages={getMessagesWithContact}/>
            <MessageArea messages={messages}/>
            <TextInput contactId={contactId}/>
        </>
    )
}

export default App;