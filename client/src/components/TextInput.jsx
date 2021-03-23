import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MessageContainer = styled.ul`
    list-style-type: none;
    width: 25%;
    height: 100%;
`;

const NewMessageForm = styled.form``;

const NewMessageInput = styled.input``;

const NewMessageSubmit = styled.button``;

const TextInput = ({ contactId }) => {
    const [ messageValue, setMessageValue ] = useState('');

    const sendMessage = (e) => {
        e.preventDefault()
        messageValue && contactId
        ? axios.post('/sendMessage', {contactId, messageValue})
            .then(() => {})
        : null;
    }

    return (
        <MessageContainer>
            {
                contactId &&
                <NewMessageForm onSubmit={sendMessage}>
                    <NewMessageInput
                        value={messageValue}
                        onChange={e => setMessageValue(e.target.value)}
                    />
                    <NewMessageSubmit>Add</NewMessageSubmit>
                </NewMessageForm>
            }
        </MessageContainer>    
    )
}

export default TextInput;
