import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';


const ContactContainer = styled.ul`
    list-style-type: none;
    width: 25%;
    height: 100%;
`;

const Contact = styled.li`

`;

const NewContactForm = styled.form``;

const NewContactInput = styled.input``;

const NewContactSubmit = styled.button``;

const NumberFormatError = styled.div`
    font-size: 0.5rem;
    color: red;
`;

const ContactList = ({contacts, postContact, setSender, getMessages}) => {
    const [value, setValue] = useState('');
    const [invalidNumberError, showInvalidNumberError] = useState(false)

    const addAndPrune = (phoneNumber) => {
        let pruneChars = /[-()\ ]/g;
        let pruned = '';
        if (phoneNumber[0] !== '+') {
            pruned += '+';
            pruned += phoneNumber.replace(pruneChars, '');
        }
        return pruned;
    }

    const submitHandler = e => {
        e.preventDefault();
        const validPhoneNumber = /(\+*[0-9]{1,2})*\-*([0-9]{1,4})*\ *\(*([0-9]{3})\)*\ *\-*([0-9]{3})\-*([0-9]{4})/;
        if (value.match(validPhoneNumber)) {
            showInvalidNumberError(false);
            postContact({number: addAndPrune(value), name: ''})
            setValue('');
        } else {
            showInvalidNumberError(true);
        }
    }

    return (
        <ContactContainer>
            <NewContactForm onSubmit={submitHandler}>
                <NewContactInput
                    value={value}
                    onChange={e => setValue(value)}
                />
                <NewContactSubmit>Add</NewContactSubmit>
                {
                    invalidNumberError
                    ? <NumberFormatError>Please enter a valid phone number</NumberFormatError>
                    : null
                }
            </NewContactForm>
            {
                contacts
                ? contacts.map((contact, key) => 
                    <Contact key={key} onClick={() => {
                            setSender(contact.id);
                            getMessages(contact.id);
                        }}
                    >
                        {contact.number}
                    </Contact>
                )
                : null
            }
        </ContactContainer>

    )
}

export default ContactList;
