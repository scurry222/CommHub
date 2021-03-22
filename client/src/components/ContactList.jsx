import axios from 'axios';
import React from 'react';
import styled from 'styled-components';


const ContactContainer = styled.ul`
    list-style-type: none;
    width: 10%;
    height: 100%;
`;

const Contact = styled.li`

`;

const ContactList = ({contacts, setContact}) => {

    const submitHandler = event => {
        axios.post
    }
    return (
        <ContactContainer>
            {
                contacts[0]
                ? contacts[0].map((contact, key) => 
                    <Contact key={key}>
                        {contact.number}
                    </Contact>
                )
                : null
            }
        </ContactContainer>

    )
}

export default ContactList;
