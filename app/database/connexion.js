module.exports = function(){

	var mongoose   = require('mongoose');

	var db_user = '';
	var db_passwd = '';
	var db_name = 'touttheque';
	var db_host = 'localhost';
	var connString = 'mongodb://' + db_user + ':' + db_passwd + '@' + db_host + '/' + db_name;
	//mongoose.connect('mongodb://localhost:27017'); // connect to our database
	mongoose.connect(connString);

}