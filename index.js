const http = require('http');
const express = require('express');
const app = express();
const url = require('url');
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

/*
** API
*/

app.post('/api/register_ajax', (req, res) => {
//	this handler registers user
});

app.post('/api/sign-in_ajax', (req, res) => {
//	this handler logins user
});

/*
** Routes
*/

/*
** @param contentPage - main part of the page
*/

app.get(/^(?!\/api\/)/, (req, res) => {
	var parsedURL = url.parse(req.url, true);
	var contentPage = parsedURL.pathname;

	if (contentPage == '/')
		contentPage += 'index';

	app.render('index', {'contentPage': contentPage}, (err, html) => {
		if (err)
		{
			res.statusCode = 400;
			res.render('index', {'contentPage': '404'});
		}
		else
		{
			res.send(html);
		}
	});
});

app.listen(8080);
