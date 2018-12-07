const repository = require('./repositories/messages-repository.js');
const {aMessage} = require('./dtos/message.js');

function demonstrateGet() {
	const id = 11;

	repository.get(id)
		.then(message => {
			console.log('The fetched message:', message);
		})
		.catch(error => console.log(error));
}

function demonstrateGetAll() {
	repository.getAll()
		.then(messages => {
			console.log('The fetched messages:', messages);
		})
		.catch(error => console.log(error));
}

function demonstrateAdd() {
	const message = aMessage().withText('This is my text').build();

	repository.add(message)
		.then(addedMessage => {
			console.log('The added message:', addedMessage);
		})
		.catch(error => console.log(error));
}

function demonstrateUpdate() {
	const id = 3;
	const message = aMessage().withText('This is my updated text').build();

	repository.update(id, message)
		.then(message => {
			console.log('The updated message:', message);
		})
		.catch(error => console.log(error));
}

function demonstrateRemove() {
	const id = 2;

	repository.remove(id)
		.then(removed => {
			console.log('Removed message with id:', removed);
		})
		.catch(error => console.log(error));
}

const selection = 2;

switch (selection) {
case 1:
	demonstarteGet();
	break;
case 2:
	demonstrateGetAll();
	break;
case 3:
	demonstrateAdd();
	break;
case 4:
	demonstrateUpdate();
	break;
case 5:
	demonstrateRemove();
	break;
default:
	console.log('choose what you want to demonstrate');
	break;
}





