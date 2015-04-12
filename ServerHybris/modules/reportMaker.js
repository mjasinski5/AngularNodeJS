/*In nearly future its gonna be functions for fancy-ninja PDF creation
Now its just writting to text file :)
*/
var fs = require('fs');

var date = new Date();
var fileName = "report_gen" + date;
var makeDailyCallReport = function(data){
  fs.writeFile(fileName, data, function(err){
    if(err)
      console.log('Error occured!');
  });
}
var makeDailyMeetReport = function(){

}


module.exports = {
  MakeDailyCallReport: makeDailyCallReport,
  MakeDailyMeetReport: makeDailyMeetReport
  }
