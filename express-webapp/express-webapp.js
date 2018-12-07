const express = require('express');
const repository = require('./repositories/messages-repository.js');
const {aMessage} = require('./dtos/message.js');

const app = express();

console.log('serving directory: ', __dirname + '/public');

app.use(express.json());
app.use(express.static(__dirname + '/public'));


app.get('/api/messages', (req, res) => {
	console.log('fetching all messages');
	
	repository.getAll()
		.then(messages => {
			console.log('The fetched messages:', messages);
			res.json(messages);
		})
		.catch(error => {
			console.log(error);
			res.status(500).end();
		});
});

app.get('/api/messages/:id', (req, res) => {
	console.log(`fetching message id "${req.params.id}"`);
	const id = Number(req.params.id);
	
	repository.get(id)
		.then(message => {
			if (message) {
				console.log('the fetched message:', message);
				res.json(message);
			} else {
				console.log('message not found');
				res.status(404).end();
			} 
		})
		.catch(error => {
			console.log(error);
			res.status(500).end();
		});
});

app.post('/api/messages', (req, res) => {
	console.log('Adding a new message');
	const message = req.body;
	
	repository.add(message)
		.then(added => {
			console.log('The added message:', added);
			res.status(201).json(added);
		})
		.catch(error => {
			console.log(error);
			res.status(500).end();
		});
});

app.put('/api/messages/:id', (req, res) => {
	console.log(`updating message id "${req.params.id}"`);
	const id = Number(req.params.id);
	const message = req.body;

	repository.update(id, message)
		.then(updated => {
			if (updated) {
				console.log('The updated message:', updated);
				res.json(updated);
			} else {
				console.log('message not found');
				res.status(404).end();
			} 
		})
		.catch(error => {
			console.log(error);
			res.status(500).end();
		});
});

app.delete('/api/messages/:id', (req, res) => {
	console.log(`removing message id "${req.params.id}"`);
	const id = Number(req.params.id);
	
	repository.remove(id)
		.then(removed => {
			if (removed) {
				console.log('The removed message:', removed);
				res.json(removed);
			} else {
				console.log('message not found');
				res.status(404).end();
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).end();
		});
});

app.listen(8080, () => console.log('Started server on http://localhost:8080'));

