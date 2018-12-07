//http://www.sqlitetutorial.net/sqlite-nodejs/
//https://github.com/mapbox/node-sqlite3/wiki/API
const sqlite3 = require('sqlite3').verbose();

const dbName = '/data/sqlite/example.db';
const dbOptions = sqlite3.OPEN_READWRITE;

function dbConnect () {
	return new Promise((resolve, reject) => {
		const db = new sqlite3.Database(dbName, dbOptions, (error) => {
			if (error) {
				reject(error);
			} else {
				resolve(db);
			}
		});
	});
}

function dbClose (db) {
	return () => {
		db.close();
	};
}

function dbInsert(db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.serialize(() => {
				db.prepare(sql, error => {if (error) reject(error);})
					.run(params, error => {if (error) reject(error);})
					.finalize();
				
				db.get('select last_insert_rowid() as id', (error, row) => {
					if (error) {
						reject(error);
					} else {
						resolve(row.id);
					}
				});
			});
		});
	};
}

function dbSelect (db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.serialize(() => {
				db.prepare(sql, error => {if (error) reject(error);})
					.all(params, (error, rows) => {
						if (error) {
							reject(error);
						} else {
							resolve(rows);
						}
					})
					.finalize();
			});
		});
	};
}

function dbUpdate (db) {
	return (sql, ...params) => {
		return new Promise((resolve, reject) => {
			db.serialize(() => {
				db.prepare(sql, error => {if (error) reject(error);})
					.run(params, error => {
						if (error) { 
							reject(error);
						} else {
							resolve(true);
						}
					})
					.finalize();
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

