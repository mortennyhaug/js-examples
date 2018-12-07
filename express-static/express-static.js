//http://expressjs.com/
const express = require('express');
const app = express();

console.log('serving directory: ', __dirname + '/public');

app.get('/api/examples', (req, res) => {
	console.log('returning examples');
	
	res.set('Content-Type', 'application/json');
  res.send({
    count: 2,
    examples: [{id: 1, name: 'example 1'}, {id: 2, name: 'example 2'}]
  });
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log('Started server on http://localhost:8080'));