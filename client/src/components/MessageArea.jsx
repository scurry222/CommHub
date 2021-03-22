import React from 'react';
import styled from 'styled-components';

const MessageList = styled.ul``;
const MessageEntry = styled.li`
    list-style-type: none;
    background: #4B5FD9;

`;

const MessageArea = ({messages}) => 
    <MessageList>
        {
            messages
            ? messages.map((message, key) => 
                <MessageEntry key={key}>
                    <div></div>
                    {message.body}
                </MessageEntry>
            )
            : null
        }
    </MessageList>

export default MessageArea;