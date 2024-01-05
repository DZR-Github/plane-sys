CREATE TABLE ticket ( 
ticket_id VARCHAR(50) PRIMARY KEY, 
flight_id VARCHAR(50), 
traveler_id VARCHAR(50), 
seating_list INT, 
cabin_rating VARCHAR(50), 
time DATETIME, 
status INT 
);