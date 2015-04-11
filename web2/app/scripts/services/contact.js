'use strict';
app.factory('contact', function ($http, ngAuthSettings) {

	var serviceBase = ngAuthSettings.apiServiceBaseUri;
	var contactFactory = {};


	var _getContacts = function(){
		return $http.get(serviceBase + 'contact/list').then(function (results) {
            return results;
        });
	}

	var _findContact = function(data){
		return $http.post(serviceBase + 'contact/find', data).then(function (results) {
                return results  ;
            })
	}

	var _addContact = function(data){
		return $http.post(serviceBase + 'contact/add', data).then(function (results) {
                return results;
            })
	}

	var _deleteContact = function(data){
		return $http.post(serviceBase + 'contact/delete', data).then(function (results) {
                return results;
            })
	}
	contactFactory.GetContacts = _getContacts;
	contactFactory.FindContacts = _findContact;
	contactFactory.AddContact = _addContact;
	contactFactory.DeleteContact = _deleteContact;


	return contactFactory;
});
