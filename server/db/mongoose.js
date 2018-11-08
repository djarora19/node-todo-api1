var mongoose = require('mongoose');

mongoose.Prmoise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp');


module.exports = {
	mongoose
};