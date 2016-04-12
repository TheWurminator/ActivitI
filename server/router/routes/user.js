//Import Modules
var express = require('express'); 
var router = express.Router();
var userQueries = require('../../queries/userQueries');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//Fetches user profile information
router.get('/', function(req,res) {
	userQueries.getProfile(req.get('token'), function(response) {
		if(response === null){
			res.status(400).send("User not found");
		}
		else{
			res.status(200).send(response);
		}
	});
});


router.post('/', jsonParser, function(req,res){
	var randtoken = require('rand-token');
    token = randtoken.generate(255);
	userQueries.createUser(token, req.body, "test_facebooktoken", function(response){
		if(response === null){
			res.status(400).send("User was not successfully created");
		}
		else{
			res.status(200).send("User was successfully created");
		}
	});	
});

//Update user profile information
router.put('/', jsonParser, function(req, res) {
	userQueries.updateProfile(req.get('token'), req.body, function(response) {
		if(response === null){
			res.status(400).send("User profile not updated");
		}
		else{
			res.status(200).send(response);
		}
	});
});

//Deletes yourself from database
router.delete('/', function(req,res) {
	userQueries.deleteUser(req.get('token'), function(response){
		if(response === null || response.affectedRows === 0){
			res.status(400).send("Unable to delete user, user not found");
		}
		else{
			res.status(200).send("User deleted");
		}
	});
});

//This is used to expose the routers to the api.js (main module)
module.exports = router;
