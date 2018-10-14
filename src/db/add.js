const url = require('url');
const http = require('https');
const readline = require('readline');
const imageSize = require('image-size');
const client = require('./client.js');

const read = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

client.connect((err) => {
	if (err) { 
		console.log(err);
		client.end();
		return;
	}
	console.log('Client connected!');

});

function makeQuery() {
	read.question('>', (answer) => {
		if (answer.substring(0, 1) == '@') {
			console.log('Discovered username!');
			client.query('INSERT INTO Artist(discord_user) VALUES ($1);', [answer], (err, result) => {
				if (err) {
					console.log(err);
				} else {
					console.log(result);
				}
			});
		} else {
			answer = answer.split(' ');
			let imgUrl = answer[0].trim();
			console.log('Discovered Path: "' + imgUrl + '"');
			let artist = parseInt(answer[1]);
			http.get(url.parse(imgUrl), (res) => {
				let chunks = [];
				res.on('data', (chunk) => {
					chunks.push(chunk);
				}).on('end', () => {
					let buffer = Buffer.concat(chunks);
					let dim = imageSize(buffer);
					client.query('INSERT INTO Image(url, artist, width, height) VALUES ($1, $2, $3, $4)', [imgUrl, artist, dim.width, dim.height], (err, result) => {
						if (err) {
							console.log(err);
						} else {
							console.log(result);
						}
					});
				});
			});
		}
		makeQuery();
	});
}

makeQuery();