import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Moment from 'react-moment';

const MessageList = styled.ul`
    height: 92.5vh;
    min-width: 22rem;
    overflow-y: scroll;
    margin-left: 12rem;
    margin-block-start: 0;
    background: #3E3E44;
`;
const MessageEntry = styled.li`
    list-style-type: none;
    width: 35%;
    margin: 1rem;
    display: flex;
    flex-direction: column;
`;
const Message = styled.div`
    background: #9FB7FF;
    padding: 0.3rem;
    border-radius: 0.5rem;
`;

const Time = styled.div`
    font-size: 0.5rem;
    color: #D9DAE3;
`;

const Sender = styled.div`
    font-size: 0.75rem;
    color: #D9DAE3;
    font-weight: bolder;
    align-self: flex-end;
`;

const MessageArea = ({messages}) => {
    const formatTime = (dateTime) => {
        return dateTime
    } 

    return (
        <MessageList>
            {
                messages &&
                messages.map((message, key) => 
                    <MessageEntry key={key}>
                        <Sender>{message.sender}</Sender>
                        <Message>{message.content}</Message>
                        <Time>
                            <Moment fromNow ago interval={60000}>
                                {message.time}
                            </Moment>
                        </Time>
                    </MessageEntry>
                )
            }
        </MessageList>
    )
}

export default MessageArea;