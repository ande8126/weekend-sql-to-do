CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	doer varchar(20),
	task varchar(280)
);

ALTER TABLE tasks
ADD status BOOLEAN DEFAULT FALSE;

INSERT INTO tasks 
	( doer, task, status ) 
VALUES
	('Pat', 'Clean the cat litter', false),
	('Jenna', 'Open Amazon packages', false),
	('Casper', 'Sit on butt, lick self', false),
	('Quinn', 'Play dress-up', false),
	('Oliver', 'Eat, puke, repeat', false);
	

SELECT * FROM tasks;