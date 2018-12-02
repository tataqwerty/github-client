const http = require('http');
const express = require('express');
const app = express();
const url = require('url');
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.get('/api/*', (req, res) => {
	console.log('API');
});

// Request that does not match api/ folder,
// Attempts to grab the html from views/pages/
app.get(/^(?!\/api\/)/, (req, res) => {   
	var purl = url.parse(req.url, true);
	var pathname = purl.pathname;


	if (pathname[pathname.length - 1] === '/')
	{
		pathname += 'index';
	}
	res.render(pathname, {'name': 'taras'}, (err, html) => {
		if (err)
		{
			res.statusCode = 400;
			res.render('404');
		}
		else
		{
			res.statusCode = 200;
			res.send(html);
		}
	});
});

app.listen(8080, () => {
	console.log('listening to 8080');
});
