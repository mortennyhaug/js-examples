const database = require('../database/database-sqlite.js');
const {aMessage} = require('../dtos/message.js');

async function get(id) {
	console.log(`Getting message with id "${id}"`);
	if (!id) {
		return Promise.reject('required argument "id" is missing');
	}
	
	const sql = 'select id, text from messages where id = ?';
	const db = await database.connect();
	return db.select(sql, id)
		.then(rows => {
			if (rows.length > 0) {
				return aMessage()
					.withId(rows[0].id)
					.withText(rows[0].text)
					.build();
			} else {
				return null;
			}
		})
		.finally(() => db.close());
}

async function getAll() {
	console.log('Getting all messages');
	
	const sql = 'select id, text from messages';
	const db = await database.connect();
	return db.select(sql)
		.then(rows => {
			return rows.map(row => aMessage()
					.withId(row.id)
					.withText(row.text)
					.build());
		})
		.finally(() => db.close());
}

async function add(message) {
	console.log('Adding new message');
	if (!message) {
		return Promise.reject('required argument "message" is missing');
	}
	
	const sql = 'insert into messages (text) values (?)';
	const db = await database.connect();
	return db.insert(sql, message.text)
		.then(result => {
			return aMessage()
				.copiedFrom(message)
				.withId(result)
				.build();
		})
		.finally(() => db.close());
}

async function update(id, message) {
	console.log(`Updating message with id "${id}"`);
	if (!id || !message) {
		return Promise.reject('required arguments "id" and/or "message" are missing');
	}
	
	const sql = 'update messages set text = ? where id = ?';
	const db = await database.connect();
	return db.update(sql, message.text, id)
		.then(success => {
			return aMessage()
				.copiedFrom(message)
				.withId(id)
				.build();
		})
		.finally(() => db.close());
}

async function remove(id) {
	console.log(`Removing message with id "${id}"`);
	if (!id) {
		return Promise.reject('required argument "id" is missing');
	}
	
	const sql = 'delete from messages where id = ?';
	const db = await database.connect();
	return db.remove(sql, id)
		.then(success => {
			return id;
		})
		.finally(() => db.close());
}

module.exports = {
  get,
	getAll,
	add,
	update,
	remove
};
