var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/list', function(req, res) {
    var db = req.db;
    db.collection('scheduledItems').find().toArray(function (err, items) {
		console.log(items);
        res.json(items);
    });
});

router.post('/add', function(req, res, next) {
	    var db = req.db;
	    var body = req.body;
	    db.collection('scheduledItems').insert(body, function(err, result) {
	    if (err)
	    	throw err;
	    if (result)
	    {
	    	console.log('Object has been added('+ body + ')');
	    	res.json(200);
	    }
	});
});

router.post('/find', function(req, res, next) {
	var db = req.db;
	var search = req.body.search;
	var regExp = new RegExp(search);
	var query = [{ name: regExp }, { lastname: regExp}, {email: regExp}];

	db.collection('contacts').find({$or: query}).toArray(function(err, items){
		console.log(items);
		res.json(items);
	})
})

router.post('/delete', function(req, res, next) {
	    var db = req.db;
	    var body = req.body;
      console.log(body);
	    db.collection('scheduledItems').removeById(body.userId, function(err, result) {
        var status = err ? 500 : 200;
        console.log(status);
        res.sendStatus(status);
	    });
});


module.exports = router;
