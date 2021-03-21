DROP DATABASE IF EXISTS communications;

CREATE DATABASE communications;

USE communications;

CREATE TABLE contacts (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    number VARCHAR(12) NOT NULL,
    name VARCHAR(50)
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    contact_id INT NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(contact_id) ON DELETE CASCADE,
    time VARCHAR(25),
    content VARCHAR(250),
    sender VARCHAR(12),
    sendee VARCHAR(12)
);


INSERT INTO contacts (number) VALUES ("+15103213810");
INSERT INTO contacts (number) VALUES ("+15233243412");
INSERT INTO contacts (number) VALUES ("+12384712749");

INSERT INTO messages (content, sender, sendee, contact_id) VALUES ("Dude did you shower today?","+15103213810", "+12345678901", 1);
INSERT INTO messages (content, sender, sendee, contact_id) VALUES ("How's the project going?","+15233243412", "+12345678902", 2);
INSERT INTO messages (content, sender, sendee, contact_id) VALUES ("That looks AWESOME!!","+15233243412", "+12345678902", 2);

-- CREATE TABLE contact_messages (
--     SELECT contacts.contact_id, contacts.number, messages.message_id, messages.sender
--     INTO contact_messages
--     FROM contacts
--     INNER JOIN messages
--     ON contacts.number = messages.sender
-- );