'use strict';

/**
 * @ngdoc overview
 * @name web2App
 * @description
 * # web2App
 *
 * Main module of the application.
 */
var app = angular
  .module('web2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngTable',
    'ui.bootstrap',
    'dialogs.main',
    'pascalprecht.translate'
  ]);



  app.config(function ($routeProvider, dialogsProvider) {

    dialogsProvider.useBackdrop('static');
		dialogsProvider.useEscClose(false);
		dialogsProvider.useCopy(false);
		dialogsProvider.setSize('sm');


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      })
      .when('/schedule/addPhoneCall', {
        templateUrl: 'views/addScheduledPhone.html',
        controller: 'addScheduledPhone'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


var serviceBase = 'http://localhost:3000/';
//var serviceBase = 'some exteral url';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'EnferOrganizer'
});
