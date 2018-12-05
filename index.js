'use strict';
const http = require('http');
const express = require('express');
const app = express();
const mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'root',
	port	: 3306,
	database: 'test'
});

connection.on('error', (err) => {
	console.log(err);
});

connection.connect();

// app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/static'));

// /*
// ** API
// */

// app.post('/api/sign-up_ajax', (req, res) => {
// //	this handler registers user
// 	res.send(`/api/sign-up_ajax`);
// });

// app.post('/api/login_ajax', (req, res) => {
// //	this handler logins user
// 	res.send(`/api/login_ajax`);
// });

// /*
// ** Page router
// */

// app.get(/(?:\/|\/home|\/index)/, (req, res) => {
// 	res.render('index', {'contentPage': 'home'});
// });

// app.get('/my-page', (req, res, next) => {
// 	// if (!req.session.isLoggedIn)
// 	// 	next();
// 	// else
// 	// 	res.render('index', {'contentPage': 'my-page'});
// });

// app.get('/sign-up', (req, res, next) => {
// 	// if (req.session.isLoggedIn)
// 	// 	next();
// 	// else
// 	// 	res.render('index', {'contentPage': 'sign-up'});
// });

// app.get('*', () => {
// 	res.render('index', {'contentPage': '404'});
// });


// // app.get(/^(?!\/api\/)/, (req, res) => {
// // 	var parsedURL = url.parse(req.url, true);
// // 	var contentPage = parsedURL.pathname;

// // 	if (contentPage == '/')
// // 		contentPage = 'index';

// // 	app.render('index', {'contentPage': contentPage}, (err, html) => {
// // 		if (err)
// // 		{
// // 			res.statusCode = 400;
// // 			res.render('index', {'contentPage': '404'});
// // 		}
// // 		else
// // 		{
// // 			res.send(html);
// // 		}
// // 	});
// // });

// app.listen(8080);
