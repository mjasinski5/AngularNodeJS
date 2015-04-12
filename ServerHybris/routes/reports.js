var express = require('express');
var router = express.Router();
var asyncReport = require('../modules/asyncReportMaker');

router.get('/list', function(req, res) {
    var db = req.db;
    db.collection('scheduledItems').find().toArray(function (err, items) {
		console.log(items);
        res.json(items);
    });
});

router.post('/daily', function(req, res, next) {
	    var db = req.db;
	    var body = req.body;
      var date = body.date;

      var files = asyncReport.MakeAllReport(db, date);
      res.download(files[0]);
	});

module.exports = router;
