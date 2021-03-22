import React, {useState, useEffect} from 'react';
import ContactList from './ContactList.jsx';
import MessageArea from './MessageArea.jsx';
// import TextInput from './TextInput.jsx';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:1337';

const App = () => {
    const [ messages, setMessages ] = useState([]);
    const [ sender, setSender ] = useState('');
    const [ contacts, setContact ] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', data => {
            setMessages(oldMessages => [...oldMessages, data])
        });
        axios.get('/contacts')
            .then(({ data }) => setContact(oldContacts => [...oldContacts, data]))
    
        axios.get('/messages/:contactId')
            .then(({ data }) => setMessages(data))
    }, [])


    const getContacts = () => {
        axios.get('/contacts')
            .then(({ data }) => setContact(oldContacts => [...oldContacts, data]))
    }

    const getMessagesWithContact = () => {
        axios.get('/messages/:contactId')
            .then(({ data }) => setMessages(data))
    }

    return (
        <>
            <ContactList contacts={contacts} setContact={setContact}/>
            <MessageArea messages={messages}/>
            {/* <TextInput setSender={setSender} sender={sender}/> */}
        </>
    )
}

export default App;