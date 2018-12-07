const childProcess = require('child_process');

function updateDatabaseSync(properties) {
	const command = `java -jar ${properties.liquibase} --defaultsFile=${properties.defaultsFile} --changeLogFile=${properties.changeLogFile} update`;
	
	console.log('executing from:', __dirname);
	console.log('executing:', command);
	
	return childProcess.execSync(command, {cwd: __dirname});
}

function updateDatabaseAsync(properties) {
	const command = `java -jar ${properties.liquibase} --defaultsFile=${properties.defaultsFile} --changeLogFile=${properties.changeLogFile} update`;
	
	console.log('executing from:', __dirname);
	console.log('executing:', command);
	
	return new Promise((resolve, reject) => {
		childProcess.exec(command, {cwd: __dirname}, (error, stdout, stderr) => {
			if (error) {
				reject({error: error, message: stdout, errorMessage: stderr});
			} else {
				resolve({message: stdout, errorMessage: stderr});
			}
		});
	});
}

const properties = {
	liquibase: 'lib/liquibase-core-3.5.1.jar',
	defaultsFile: 'resources/liquibase.sqlite.properties',
	changeLogFile: 'resources/master.xml'
};

updateDatabaseSync(properties);

//updateDatabaseAsync(properties)
//	.then(success => {
//		console.log('The operation succeeded');
//		if (success.message) console.log('Message:', success.message);
//		if (success.errorMessage) console.log('Error message:', success.message);
//	})
//	.catch(error => {
//		console.log('The operation failed with error:', error.error.message);
//		if (error.message) console.log('Message:', error.message);
//		if (error.errorMessage) console.log('Error message:', error.message);
//	});
