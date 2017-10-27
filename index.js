// 'use strict'
// const http = require('http');
// const fs = require('fs')
// const server = http.createServer();
// server.on('request', doRequest);
// server.listen(8000);
// console.log('listen server...');
//
// function doRequest(req, res){
// 	var number = Math.floor(Math.random() * 3);
// 	fs.readFile('./hello.html', 'UTF-8',
// 	function(err, data){
// 		var title = ['Sample Page',　'ランダムやで', 'さんぷるぺーじ'];
// 		var content = ['ランダムやで', 'ramdamやで', '書くもん無いで'];
// 		var data2 = data.replace(/@title@/g, title[number]).replace(/@content@/g, content[number]);
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 		res.write(data2);
// 		res.end();
// 	});
// }

// 'use strict'
// const http = require('http');
// const fs = require('fs');
// const ejs = require('ejs');
// //ファイルの読み込み
// const hello = fs.readFileSync('./hello.ejs', 'utf8');
// const content1 = fs.readFileSync('./content1.ejs', 'utf8');
// //サーバー構築
// const server = http.createServer();
// server.on('request', doRequest);
// server.listen(8000);
// console.log('listen server...');
// //リクエスト処理
// function doRequest(req, res){
// 	const hello2 = ejs.render(hello, {
// 		title: 'タイトル',
// 		content: ejs.render(content1, {
// 			message: [
// 				'最初のデータ',
// 				'次のデータ',
// 				'最後のデータ'
// 			]
// 		})
// 	});
// 	res.writeHead(200, {'Content-Type': 'text/html'});
// 	res.write(hello2);
// 	res.end();
// };

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const content1 = fs.readFileSync('./content1.ejs', 'utf8');
const content2 = fs.readFileSync('./content2.ejs', 'utf8');
const content3 = fs.readFileSync('./content3.ejs', 'utf8');
const template = fs.readFileSync('./template.ejs', 'utf8');

var routes = {
	'/': {
		'title': 'Main Page',
		'message': 'サンプルページやで',
		'content': content1
	},
	'/index': {
		'title': 'Main Page',
		'message': 'サンプルページやねんで',
		'content': content1
	},
	'/other': {
		'title': 'Other Page',
		'message': '別ページやで',
		'content': content2
	},
	'/post': {
		'title': 'Post Page',
		'message': 'POSTページやで',
		'content': content3
	}
};

var server = http.createServer();
server.on('request', doRequest);
server.listen(8000);
console.log('listen server...');

function doRequest(req, res){

	var body = '';
	req.on('data', function(data){
		body += data
	}

	var url_parts = url.parse(req.url);

//routes check
	if (routes[url_parts.pathname] == null) {
		console.log('NOT FOUND PAGE: ' + req.url);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<html><body><h1>NOT FOUND PAGE ' + req.url + ' </h1></body></html>');
		return;
	}

//page render
	var content = ejs.render(template, {
		title: routes[url_parts.pathname].title,
		content: ejs.render(routes[url_parts.pathname].content,{
			message: routes[url_parts.pathname].message
		})
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(content);
	res.end();
}
