import React, {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import styled from 'styled-components';
import axios from 'axios';


import ContactList from './ContactList.jsx';
import MessageArea from './MessageArea.jsx';
import TextInput from './TextInput.jsx';
import useSound from 'use-sound';

const ENDPOINT = 'http://localhost:1337';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const App = () => {
    const [ messages, setMessages ] = useState([]);
    const [ contactId, setContactId ] = useState(0);
    const [ contact, setContact ] = useState('');
    const [ contacts, addContact ] = useState([]);
    const [ newMessage ] = useSound(
        '..//static/me-too-603.mp3',
        { volume: 1 }
    )

    useEffect(() => {
        getContacts();

        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', ({ id }) => {
            getContacts();
            console.log(contactId, id)
            if (id === contactId) {
                getMessagesWithContact(id);
            }
            newMessage();
        });
    }, [contactId, messages, newMessage])

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
        <AppContainer>
            <ContactList contacts={contacts} postContact={postContact} setContactId={setContactId} setContact={setContact} getMessages={getMessagesWithContact}/>
            <MessageArea messages={messages} contactId={contactId}/>
            <TextInput contactId={contactId} contact={contact}/>
        </AppContainer>
    )
}

export default App;