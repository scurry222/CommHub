import React, {useState} from 'react';


const TextInput = () => {
    const [formData, setFormData] = useState('');

    const submitHandler = event => {
        axios.post('/send_sms')
        .then(data => )
    }

    <form></form>
}