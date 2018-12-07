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
		.then(buildMessageFromRows)
		.finally(() => db.close());
}

async function getAll() {
	console.log('Getting all messages');
	
	const sql = 'select id, text from messages';

	const db = await database.connect();
	return db.select(sql)
		.then(rows => rows.map(buildMessageFromRow))
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
		.then(id => aMessage().copiedFrom(message).withId(id).build())
		.finally(() => db.close());
}

async function update(id, message) {
	console.log(`Updating message with id "${id}"`);
	if (!id || !message) {
		return Promise.reject('required arguments "id" and/or "message" are missing');
	}
	
	const updateSql = 'update messages set text = ? where id = ?';
	const selectSql = 'select id, text from messages where id = ?';
	
	const db = await database.connect();
	return db.update(updateSql, message.text, id)
		.then(success => db.select(selectSql, id))
		.then(buildMessageFromRows)
		.finally(() => db.close());
}

async function remove(id) {
	console.log(`Removing message with id "${id}"`);
	if (!id) {
		return Promise.reject('required argument "id" is missing');
	}
	
	const deleteSql = 'delete from messages where id = ?';
	const selectSql = 'select id, text from messages where id = ?';
	
	const db = await database.connect();
	return db.select(selectSql, id)
		.then(buildMessageFromRows)
		.then(message => {
			return db.remove(deleteSql, id)
				.then(success => message);
		})
		.finally(() => db.close());
}

function buildMessageFromRows(rows) {
	if (rows.length > 0) {
		return buildMessageFromRow(rows[0]);
	} else {
		return null;
	}
}

function buildMessageFromRow(row) {
	return aMessage()
		.withId(row.id)
		.withText(row.text)
		.build();
}

module.exports = {
  get,
	getAll,
	add,
	update,
	remove
};
