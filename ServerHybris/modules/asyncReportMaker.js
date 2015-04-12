var express = require('express');
var async = require('async');
var dbData = [];
var files= [];
var fs = require('fs');


var loadDatabaseData = function(callback){
  console.log("in loadDtaabase");
  console.log(db);
  database.collection('scheduledItems').find().toArray(function(arr, err){
    if(err)
      callback(err);
    dbData = arr;
  })
}

/*First we load data from database,
when its finished async.parallel fires up which is resposible
for creating files with reports */
var dailyReport = function(db, date) {
  console.log(db);
  var database = db;
  /*
async.series([
  loadDatabaseData.bind(null, cb, db),
  parallelTasks
], cb)*/
async.series([
  function(callback){
      console.log("in loadDtaabase");
      database.collection('scheduledItems').find().toArray(function(err, arr){
        if(err)
        {
          console.log("inside err");
          return callback(err);
        }
        dbData = arr;
        console.log("inside find");
        console.log(arr);
        callback();
      })

  },
  function(callback) {
    console.log("inside 0 par");

    async.parallel([
      function(callback){
        console.log("inside 1 par");
        var date = new Date();
        var fileName = "report_gen.txt";
        fs.writeFile(fileName, "fdfddfdf", function(err){
          if(err)
          {
            console.log("inside err - par");
            return callback(err);
          }
          else {
            console.log("inside par OK");
            callback();
            }
        });
      },
      function(callback){
          console.log("2 parallel");
          callback();
      }
    ], callback)
  }
    ], function(err) {
        if (err)
           console.log(err);
        console.log('all ok');
    });
}

var parallelTasks = function(callback){
  console.log("in parralel");
  async.parallel([
    makeDailyCallReport.bind(null, dbData),
    makeDailyMeetReport.bind(null, dbData)
  ], callback)
}



var cb = function(err){
  console.log("inside callback")

  if(err)
    console.log("something went wrong... : " + err);
  else return files;
}

var addFile = function(file){
  files.push(file);
}

/*******************************/
var date = new Date();
var fileName2 = "report_gen" + date;
var makeDailyCallReport = function(callback){
  console.log('Inside call!');
  fs.writeFile(fileName2, dbData, function(err){
    if(err)
    {
      callback(err);
    }
    else callback();
  });
}
var makeDailyMeetReport = function(){

}



module.exports = {
  MakeAllReport: dailyReport
}
