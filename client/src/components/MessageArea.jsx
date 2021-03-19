import React from 'react';
import styled from 'styled-components';

const MessageList = styled.ul``;

const MessageArea = ({messages}) => 
    <MessageList>
        {
            messages
            ? messages.map((message, key) => 
                <li key={key}>
                    {message}
                </li>
            )
            : null
        }
    </MessageList>

export default MessageArea;