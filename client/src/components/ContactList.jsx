import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const ContactContainer = styled.ul`
    list-style-type: none;
    width: 11.4rem;
    height: 100%;
    padding-inline-start: 0;
    position: fixed;
    margin-block-start: 0;
    margin-block-end: 0;
    background: #20202D;
    padding: 1rem;
`;

const Contact = styled.li`
    padding: 1rem 1.5rem;
    cursor: pointer;
    color: #D9DAE3;

    &:not(:last-child) {
        border-bottom: 0.1rem solid white;
    }
`;

const NewContactForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const NewContactInput = styled.input`
    height: 1.5rem;
    border-radius: 0.35rem;
    border: none;
    &:focus {
        outline: none;
    }
`;

const NewContactSubmit = styled.button`
    font-size: 1.4rem;
    border: none;
    background: none;
    color: white;
    &:hover {
        color: #47CBFF;
    }
    &:focus {
        outline: none;
    }
`;

const NumberFormatError = styled.div`
    font-size: 0.5rem;
    color: red;
`;

const ContactList = ({contacts, postContact, setContactId, setContact, getMessages}) => {
    const [contactValue, setContactValue] = useState('');
    const [invalidNumberError, showInvalidNumberError] = useState(false);

    const addAndPrune = (phoneNumber) => {
        let pruneChars = /[-()\ ]/g;
        let pruned = '';
        if (phoneNumber[0] !== '+') {
            pruned += '+';
            pruned += phoneNumber.replace(pruneChars, '');
        }
        return pruned;
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const validPhoneNumber = /(\+*[0-9]{1,2})*\-*([0-9]{1,4})*\ *\(*([0-9]{3})\)*\ *\-*([0-9]{3})\-*([0-9]{4})/;
        if (contactValue.match(validPhoneNumber)) {
            showInvalidNumberError(false);
            postContact({number: addAndPrune(contactValue), name: ''})
            setContactValue('');
        } else {
            showInvalidNumberError(true);
        }
    }

    return (
        <ContactContainer>
            <NewContactForm onSubmit={submitHandler}>
                <NewContactInput
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                />
                <NewContactSubmit><FontAwesomeIcon icon={faPlus}/></NewContactSubmit>
                {
                    invalidNumberError
                    ? <NumberFormatError>Please enter a valid phone number</NumberFormatError>
                    : null
                }
            </NewContactForm>
            {
                contacts &&
                contacts.map((contact, key) => 
                    <Contact
                        key={key}
                        onClick={(e) => {
                            e.preventDefault();
                            setContactId(contact.id);
                            setContact(contact.name ? contact.name : contact.number)
                            getMessages(contact.id);
                        }}
                    >
                        {contact.number}
                    </Contact>
                )
            }
        </ContactContainer>

    )
}

export default ContactList;
