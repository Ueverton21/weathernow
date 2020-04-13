const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')));

app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'));
});

//Para rodar no servidor adicione script no package.json: "start": "node server.js" 

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`app is listening on port: ${port}`);