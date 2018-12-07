//https://github.com/mysqljs/mysql
const mysql = require('mysql');

const dbOptions = {
	host: 'malxmysqlstage01',
	database: 'midas_dev',
	user: 'midas_admin',
	password: 'uochaizie0ofe3ohGei4ree6'
}

function dbConnect() {
	return new Promise((resolve, reject) => {
		const db = mysql.createConnection(dbOptions);
		db.connect((error) => {
			if (error) {
				reject(error);
			} else {
				resolve(db);
			}
		});
	});
}

function dbClose(db) {
	return () => {
		db.end();
	};
}

function dbInsert(db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.query(sql, params, (error, results, fields) => {
				if (error) {
					reject(error);
				} else {
					resolve(results.insertId);
				}
			});
		});
	};
}

function dbSelect (db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.query(sql, params, (error, results, fields) => {
				if (error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	};
}

function dbUpdate (db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.query(sql, params, (error, results, fields) => {
				if (error) {
					reject(error);
				} else {
					resolve(true);
				}
			});
		});
	};
}

module.exports = {
	connect: () => {
		return dbConnect()
			.then((db) => {
				return {
					insert: dbInsert(db),
					select: dbSelect(db),
					update: dbUpdate(db),
					remove: dbUpdate(db),
					close: dbClose(db)
				};
			});
	}
};