const express = require('express');

const app = express();

app.use(express.json());

const messages = [
	{id: 1, text: 'text message 1'},
	{id: 2, text: 'text message 2'},
	{id: 3, text: 'text message 3'}
];

app.get('/api/messages', (req, res) => {
	console.log('Fetching all messages');

	res.json(messages);
});

app.get('/api/messages/:id', (req, res) => {
	console.log(`Fetching message id "${req.params.id}"`);

	res.json(messages[0]);
});

app.post('/api/messages', (req, res) => {
	console.log('Adding message');
	const message = req.body;
	
	res.json(message);
});

app.listen(8181, () => console.log('Started server on http://localhost:8181'));