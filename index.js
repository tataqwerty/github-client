'use strict';
const http = require('http');
const express = require('express');
const app = express();
const mysql = require('mysql');
const tokenGenerator = require('uid-safe');
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

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

/*
** API
*/

//	this handler registers user
app.post('/api/sign-up_ajax', (req, res) => {

});

//	this handler logins user
// app.post('/api/login_ajax', (req, res) => {
// 	var login = connection.escape(req.login);
// 	var password = req.password;

// 	// if (isLoggedIn(req.cookies.token))
// 	// {
// 	// 	return res.send('You\'re already logged in');
// 	// }

// 	connection.query(`SELECT * FROM \`users\` WHERE \`login\` = '${login}';`, (err, result) => {
// 		if (err)
// 		{
// 			console.log(err);
// 			return res.status(500).send('Internal server error');
// 		}

// 		if (typeof result === 'undefined')
// 		{
// 			return res.send('There are no such login');
// 		}

// 		if (result.password != hash(password))
// 		{
// 			return res.send('Invalid login or password');
// 		}

// 		tokenGenerator(32, (err, token) => {
// 			if (err)
// 			{
// 				console.log(err);
// 				return res.status(500).send('Internal server error');
// 			}

// 			res.cookie('token', token);	//	needs to be HttpOnly
// 			res.end();
// 		});
// 	});
// });



app.post('/api/login_ajax', (req, res) => {
	checkLoggedIn(req.cookies.token)
	.then(
	() => {	//	database contains such session id
		res.redirect('/');
	},
	() => {	//	user is not logged in => login
		var login = connection.escape(req.login);
		var password = req.password;

		connection.query(`SELECT * FROM \`users\` WHERE \`login\` = '${login}';`, (err, result) => {
			if (err)
			{
				console.log(err);
				return res.status(500).send('Internal server error');
			}

			if (typeof result === 'undefined')
			{
				return res.send('There are no such login');
			}

			if (result.password != hash(password))
			{
				return res.send('Invalid login or password');
			}

			tokenGenerator(32, (err, token) => {
				if (err)
				{
					console.log(err);
					return res.status(500).send('Internal server error');
				}

				res.cookie('token', token);	//	needs to be HttpOnly
				res.end();
			});
		});
	});
});




/*
** Page router
*/

app.get(/(?:\/|\/home|\/index)/, (req, res) => {
	res.render('index', {'contentPage': 'home'});
});

app.get('/my-page', (req, res, next) => {
	// if (!req.session.isLoggedIn)
	// 	next();
	// else
	// 	res.render('index', {'contentPage': 'my-page'});
});

app.get('/sign-up', (req, res, next) => {
	// if (req.session.isLoggedIn)
	// 	next();
	// else
	// 	res.render('index', {'contentPage': 'sign-up'});
});

app.get('*', () => {
	res.render('index', {'contentPage': '404'});
});


// app.get(/^(?!\/api\/)/, (req, res) => {
// 	var parsedURL = url.parse(req.url, true);
// 	var contentPage = parsedURL.pathname;

// 	if (contentPage == '/')
// 		contentPage = 'index';

// 	app.render('index', {'contentPage': contentPage}, (err, html) => {
// 		if (err)
// 		{
// 			res.statusCode = 400;
// 			res.render('index', {'contentPage': '404'});
// 		}
// 		else
// 		{
// 			res.send(html);
// 		}
// 	});
// });

app.listen(8080);

/*
** this function returns Promise, casue I don't know how to do better.
** if database contains token (user is logged in) => onsuccess call
** else => onerror
*/
function checkLoggedIn(token)
{
	return new Promise((onsuccess, onerror) => {
		if (typeof token === 'undefined') 
			return onerror();
		connection.query(`SELECT * FROM \`session\` WHERE \`token\` = '${token}';`, (err, result) => {
			if (err)
			{
				console.log(err);
				return onerror();
			}
			if (typeof result === 'undefined')
				return onerror();
			onsuccess();
		});
	});
}
