const {
	SHA256
} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

var password = "abc123!";

bcryptjs.genSalt(10, (err, salt) => {
	bcryptjs.hash(password, salt, (e, hash) => {
		console.log(hash);
	});
});

var hashedPass = '$2a$10$P5uNkWxt.7VaHAWYqwfqEuVFiKPQopaFy5qNI/uSwXxKAMJK2gYbW';

bcryptjs.compare(password, hashedPass, (err, res) => {
	console.log(res);
});

// var data = {
// 	id: "user123"
// }
//
// var token = jwt.sign(data, 'sec123');
// console.log(token);
//
// var dec = jwt.verify(token, 'sec123');
// console.log(dec);

// var msg = "this is a test string";
// var hash = SHA256(msg).toString();
//
// console.log(`Message : ${msg}`);
// console.log(`Hashed Message : ${hash}`);
//
// var data = {
// 	id: "user123"
// }
//
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'encrypt data').toString()
// };
//
// // token.data.id = "user124";
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resHash = SHA256(JSON.stringify(token.data) + 'encrypt data').toString();
//
// if (resHash === token.hash) {
// 	console.log('Authenticated successfully.');
// } else {
// 	console.log('Access denied.');
// }