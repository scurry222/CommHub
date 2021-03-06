DROP DATABASE IF EXISTS communications;

CREATE DATABASE communications;

USE communications;

CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    number VARCHAR(25) NOT NULL,
    name VARCHAR(50)
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contactId INT NOT NULL,
    FOREIGN KEY (contactId) REFERENCES contacts(id) ON DELETE CASCADE,
    time VARCHAR(25),
    content VARCHAR(250),
    sender VARCHAR(25),
    sendee VARCHAR(25)
);


INSERT INTO contacts (number) VALUES ("+15103213810");
INSERT INTO contacts (number) VALUES ("+15233243412");
INSERT INTO contacts (number) VALUES ("+12384712749");

INSERT INTO messages (content, sender, sendee, contactId) VALUES ("Dude did you shower today?","+15103213810", "+12345678901", 1);
INSERT INTO messages (content, sender, sendee, contactId) VALUES ("How's the project going?","+15233243412", "+12345678902", 2);
INSERT INTO messages (content, sender, sendee, contactId) VALUES ("That looks AWESOME!!","+15233243412", "+12345678902", 2);

-- CREATE TABLE contact_messages (
--     SELECT contacts.contact_id, contacts.number, messages.message_id, messages.sender
--     INTO contact_messages
--     FROM contacts
--     INNER JOIN messages
--     ON contacts.number = messages.sender
-- );