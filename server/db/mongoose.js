var mongoose = require('mongoose');

mongoose.Prmoise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp');


module.exports = {
	mongoose
};