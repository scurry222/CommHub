import React, {useState, useEffect} from 'react';
// import AddContact from './AddContact.jsx';
import MessageArea from './MessageArea.jsx';
// import TextInput from './TextInput.jsx';
import axios from 'axios';

const App = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.post('/')
        .then(({data}) => setMessages(data))
        console.log(messages)
    })

    return (
        <>
            {/* <AddContact /> */}
            <MessageArea messages={messages}/>
            {/* <TextInput /> */}
        </>
    )
}

export default App;