import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const MessageContainer = styled.div`
    position: fixed;
    list-style-type: none;
    border: 0;
    bottom: 0;
    width: 100%;
    left: 0;
    background: grey;
`;

const NewMessageForm = styled.form`
    padding: 1rem;
    display: flex;
    justify-content: space-around;
`;

const NewMessageInput = styled.input`
    width: 80%;
    height: 1.5rem;
    border-radius: 0.35rem;
    border: none;
    &:focus {
        outline: none;
    }
`;

const NewMessageSubmit = styled.button`
    font-size: 1.4rem;
    border: none;
    background: none;
    &:hover {
        color: #47CBFF;
    }
    &:focus {
        outline: none;
    }
`;

const TextInput = ({ contactId, contact }) => {
    const [ messageValue, setMessageValue ] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();
        messageValue && contactId
        ? axios.post('/sendMessage', {contactId, messageValue})
            .then(() => {})
        : null;
        setMessageValue('');
    }

    return (
        <MessageContainer>
            {
                contactId > 0 &&
                <NewMessageForm onSubmit={sendMessage}>
                    <NewMessageInput
                        value={messageValue}
                        placeholder={`Message ${contact}`}
                        onChange={e => setMessageValue(e.target.value)}
                    />
                    <NewMessageSubmit><FontAwesomeIcon icon={faAngleRight}/></NewMessageSubmit>
                </NewMessageForm>
            }
        </MessageContainer>    
    )
}

export default TextInput;
