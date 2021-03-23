import React, {useState, useEffect} from 'react';
import ContactList from './ContactList.jsx';
import MessageArea from './MessageArea.jsx';
// import TextInput from './TextInput.jsx';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:1337';

const App = () => {
    const [ messages, setMessages ] = useState([]);
    const [ sender, setSender ] = useState(0);
    const [ contacts, addContact ] = useState([]);

    useEffect(() => {
        getContacts();

        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', (data) => {
            getContacts();
            console.log(sender, data.contactId)
            if (data.contactId === sender) {
                getMessagesWithContact(data.contactId)
            }
        });
    }, [sender])

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
            <ContactList contacts={contacts} postContact={postContact} setSender={setSender} getMessages={getMessagesWithContact}/>
            <MessageArea messages={messages}/>
            {/* <TextInput setSender={setSender} sender={sender}/> */}
        </>
    )
}

export default App;