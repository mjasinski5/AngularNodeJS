var express = require('express');
var async = require('async');
var events = require('events');
var deasync = require('deasync');

var files= [];
var fs = require('fs');
var dbData;
var database = {};
var succeed = false;
var eventEmitter = new events.EventEmitter();


var loadDatabaseData = function(callback){
  database.collection('scheduledItems').find().toArray(function(arr, err){
    if(err)
      return callback(err);
    dbData = arr;
  })
}

/*First we load data from database,
when its finished async.parallel fires up which is resposible
for creating files with reports */
var dailyReport = function(db, date) {
  database = db;
  makeAsynchroniousOperation();

  while(!succeed)
    deasync.runLoopOnce();

  return files;
}

function makeAsynchroniousOperation(){
  async.series([
    loadFromDatabase,
    makeReportsInParallel
  ], done);
}

function loadFromDatabase(callback){
  database.collection('scheduledItems').find().toArray(function(err, arr){
    if(err)
      return callback(err);

    dbData = arr;
    callback();
  })
}

function done(err)
{
  if(err)
    console.log(err)
  else
  {
    console.log("all went ok");
  }
  succeed = true;

}

function makeReportsInParallel(callback){
  async.parallel([
    createFile,
    randomTask
  ], callback)
}

function randomTask(callback){
  var fileName = "report_gen2.txt"
  fs.writeFile(fileName, JSON.stringify(dbData), callback);
  addFile(fileName);
}

function createFile(callback){
    var fileName = "report_gen.txt"
    fs.writeFile(fileName, JSON.stringify(dbData), callback);
    addFile(fileName);
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
