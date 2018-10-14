const dotenv = require('dotenv');
const express = require('express');
const pg = require('pg');

dotenv.config();

const PORT = 3001;
const pgConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATA,
	port: 5432,
	host: process.env.DB_URL,
	ssl: true
};

var db = new pg.Client(pgConfig);
var app = express();

app.use(express.json());
app.use(express.static('res'));

app.get('/api/images', (req, res, next) => {
	let params = req.query;
	let query = db.query('SELECT * FROM Image img JOIN Artist ast ON img.artist = ast.id WHERE img.id > $1 ORDER BY img.id LIMIT 50', [params.next ? params.next : 0]);
	query.then((result) => {
		res.status(200);
		res.send(result.rows);
		res.end();
	}).catch((err) => {
		res.status(500);
		res.end();
	})
});

db.connect((err) => {
	if (err) {
		console.log('ERROR: Failed to connect to Postgres.');
		console.log(err);
		process.exit(1);
	}
	app.listen(PORT, () => {
		console.log('App listening on ' + PORT);
	});
});