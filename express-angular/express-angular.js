const express = require('express');
const app = express();

console.log('serving directory: ', __dirname + '/public');

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log('Started server on http://localhost:8080'));