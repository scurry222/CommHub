DROP DATABASE IF EXISTS communications;

CREATE DATABASE communications;

USE communications;

CREATE TABLE contacts (
    contact_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    number VARCHAR(12) NOT NULL,
    name VARCHAR(50)
);

CREATE TABLE messages (
    message_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    time VARCHAR(25),
    content VARCHAR(250),
    sender VARCHAR(12),
    sendee VARCHAR(12)
);


INSERT INTO contacts (number) VALUES ("+15103213810");
INSERT INTO contacts (number) VALUES ("+15233243412");
INSERT INTO contacts (number) VALUES ("+12384712749");

INSERT INTO messages (content, sender, sendee) VALUES ("Dude did you shower today?","+15103213810", "+15104326301");
INSERT INTO messages (content, sender, sendee) VALUES ("How's the project going?","+15233243412", "+15104326301");
INSERT INTO messages (content, sender, sendee) VALUES ("That looks AWESOME!!","+12384712749", "+15104326301");

-- CREATE TABLE contact_messages (
--     SELECT contacts.contact_id, contacts.number, messages.message_id, messages.sender
--     INTO contact_messages
--     FROM contacts
--     INNER JOIN messages
--     ON contacts.number = messages.sender
-- );