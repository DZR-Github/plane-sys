CREATE TABLE bill ( 
bill_id VARCHAR(50) PRIMARY KEY, 
traveler_id VARCHAR(50), 
ticket_id VARCHAR(50), 
payment INT, 
time DATETIME, 
status INT 
);