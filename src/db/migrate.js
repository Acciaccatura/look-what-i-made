const client = require('./client.js');
const fs = require('fs');
const setupSql = fs.readFileSync('src/db/create.sql').toString();

client.connect((err) => {
	if (err) { 
		console.log(err);
		client.end();
		return;
	}
	console.log('Client connected!');
	client.query(setupSql, (err, result) => {
		console.log('Client ran code!');
		if (err) {
			console.log(err);
		} else {
			console.log('Client running code!');
			console.log(result);
		}
		console.log('Terminating client...');
		process.exit(0);
	});
});