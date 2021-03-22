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
    const [ contacts, addContact ] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', data => {
            setMessages(oldMessages => [...oldMessages, data])
        });
        axios.get('/contacts')
            .then(({ data }) => addContact([data]))
    
        axios.get('/messages/:contactId')
            .then(({ data }) => setMessages(data))
    }, [])


    const getContacts = () =>
        axios.get('/contacts')
            .then(({ data }) => addContact([data]))

    const getMessagesWithContact = () =>
        axios.get('/messages/:contactId')
            .then(({ data }) => setMessages(data))

    const postContact = ({number, name}) =>
        axios.post('/contacts', {number, name})
            .then(() => getContacts())

    return (
        <>
            <ContactList contacts={contacts} postContact={postContact} setSender={setSender}/>
            <MessageArea messages={messages}/>
            {/* <TextInput setSender={setSender} sender={sender}/> */}
        </>
    )
}

export default App;