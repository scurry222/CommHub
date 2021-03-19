import React, {useState, useEffect} from 'react';
// import AddContact from './AddContact.jsx';
import MessageArea from './MessageArea.jsx';
// import TextInput from './TextInput.jsx';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const ENDPOINT = 'http://localhost:1337';

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('FromAPI', data => {
            setMessages(oldMessages => [...oldMessages, data])
        })
    }, [])

    return (
        <>
            {/* <AddContact /> */}
            <MessageArea messages={messages}/>
            {/* <TextInput /> */}
        </>
    )
}

export default App;