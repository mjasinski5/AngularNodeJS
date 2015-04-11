'use strict';
app.factory('schedule', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var scheduleFactory = {};

	var _getScheduledItems = function(){
		return $http.get(serviceBase + 'schedule/list').then(function (results) {
            return results;
        });
	}

	var _findScheduledItems = function(data){
		return $http.post(serviceBase + 'schedule/find', data).then(function (results) {
                return results  ;
            })
	}

	var _addScheduledItem = function(data){
		return $http.post(serviceBase + 'schedule/add', data).then(function (results) {
                return results;
            })
	}

	var _deleteScheduledItem = function(data){
		return $http.post(serviceBase + 'schedule/delete', data).then(function (results) {
                return results;
            })
	}
	scheduleFactory.GetScheduledItems = _getScheduledItems;
	scheduleFactory.FindScheduledItems = _findScheduledItems;
	scheduleFactory.AddScheduledItem = _addScheduledItem;
	scheduleFactory.DeleteScheduledItem= _deleteScheduledItem;


	return scheduleFactory;
});
