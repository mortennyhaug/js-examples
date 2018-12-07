const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.get('/api/messages', (req, res) => {
	console.log('Invoking remote get of messages');
	
	const getOptions = {
		method: 'GET',
		headers: { 'Accept': 'application/json' }
	};
	
	fetch('http://localhost:8181/api/messages', getOptions)
		.then(response => {
			console.log('response:', response);
			return response.json()
		})
		.then(messages => {
			console.log('messages:', messages);
			res.json(messages);
		})
		.catch(error => {
			console.log('error:', error);
			res.status(500).send(error.stack);
		});
});

app.get('/api/messages/:id', (req, res) => {
	console.log(`Invoking remote get of message with id ${req.params.id}`);
	
	const getOptions = {
		method: 'GET',
		headers: { 'Accept': 'application/json' }
	};
	
	fetch(`http://localhost:8181/api/messages/${req.params.id}`, getOptions)
		.then(response => response.json())
		.then(message => {
			console.log('message:', message);
			res.json(message);
		})
		.catch(error => {
			console.log('error:', error);
			res.status(500).send(error.stack);
		});
});

app.post('/api/messages', (req, res) => {
	console.log('Invoking remote post of messages');
	
	const message = req.body;
	const postOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(message)
	};
	
	fetch('http://localhost:8181/api/messages', postOptions)
		.then(response => response.json())
		.then(message => {
			console.log('message:', message);
			res.json(message);
		})
		.catch(error => {
			console.log('error:', error);
			res.status(500).send(error.stack);
		});
});

app.listen(8080, () => console.log('Started server on http://localhost:8080'));