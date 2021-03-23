import React from 'react';
import styled from 'styled-components';

const MessageList = styled.ul``;
const MessageEntry = styled.li`
    list-style-type: none;
    background: #4B5FD9;
`;
const Message = styled.div``;

const MessageArea = ({messages}) => 
    <MessageList>
        {
            messages &&
            messages.map((message, key) => 
                <MessageEntry key={key}>
                    <Message>{message.content}</Message>

                    
                </MessageEntry>
            )
        }
    </MessageList>

export default MessageArea;