'use strict';
app.controller('ContactsCtrl', ['$scope', 'ngTableParams', '$filter', 'contact', '$modal', 'dialogs', 'schedule', function ($scope, ngTableParams, $filter, contact, $modal, dialogs, schedule) {

	//helper functions
	var refreshData = function(){
		$scope.tableParamsContact.total($scope.data.length)
		$scope.tableParamsContact.reload();
	}
	var refreshScheduleData = function(){
		$scope.tableParamsScheduled.total($scope.scheduledItemsData.length)
		$scope.tableParamsScheduled.reload();
	}

	var getContacts = function(){
			return contact.GetContacts().then(function(result){
			$scope.data = result.data;
			refreshData();
		})
	}

	var getScheduledItems = function(){
			return schedule.GetScheduledItems().then(function(results){
				$scope.scheduledItemsData = result.data;
				refreshScheduleData();
			})

	}


	$scope.showContacts = function(){
		$scope.showContacts = true;
		$scope.showCalls = false;
		$scope.showMeetings = false;
		refreshData();
	}

	$scope.showScheduledCalls = function(){
		$scope.showContacts = false;
		$scope.showCalls = true;
		$scope.showMeetings = false;
		refreshData();
	}

	$scope.showScheduledMeetings = function(){
		$scope.showContacts = true;
		$scope.showCalls = false;
		$scope.showMeetings = true;
		refreshData();
	}
	//end
	//Init app
	getContacts();
	getScheduledItems();
	$scope.showContacts = true;
	$scope.showCalls = false;
	$scope.showMeetings = false;
	$scope.data = [];
	$scope.errorOccurd = false;
	$scope.notificationMessage = '';
	$scope.data = {};
	$scope.scheduledItemsData = {};
	//end

	$scope.tableParamsContact = new ngTableParams({
	    page: 1,            // show first page
	    count: 10,          // count per page
	    sorting: {
	        name: 'asc'     // initial sorting
	    }
	}, {
	    total: $scope.data.length, // length of data
	    getData: function($defer, params) {
	        // use build-in angular filter
		        var orderedData = params.sorting() ?
	                            $filter('orderBy')($scope.data, params.orderBy()) :
	                            $scope.data;

	        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	    }
	});

	$scope.tableParamsScheduled= new ngTableParams({
	    page: 1,            // show first page
	    count: 10,          // count per page
	    sorting: {
	        name: 'asc'     // initial sorting
	    }
	}, {
	    total: $scope.scheduledItemsData.length, // length of data
	    getData: function($defer, params) {
	        // use build-in angular filter
		        var orderedData = params.sorting() ?
	                            $filter('orderBy')($scope.scheduledItemsData, params.orderBy()) :
	                            $scope.scheduledItemsData;

	        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	    }
	});

	$scope.deleteUser = function(id){

		var dlg = dialogs.confirm('Please Confirm','Would you like to delete this contact??');

		dlg.result.then(function(btn){
			var obj = { userId: id};
			contact.DeleteContact(JSON.stringify(obj)).then(function(result){
				$scope.errorOccurd = false;
				$scope.notificationMessage = "User has been deleted."
				getContacts();
			});
			refreshData();
		},function(err){
			return false;
		});
	}
	$scope.openAddContactModal = function() {

		var modalInstance = $modal.open({
            templateUrl: 'views/modals/addContact.html',
            controller: 'addContactCtrl',
            size: 'lg',
            resolve: {            }
        });

        modalInstance.result.then(function (model) {
            $scope.submitModel = model;
						contact.AddContact(JSON.stringify($scope.submitModel)).then(function(result){
							$scope.notificationMessage = "Contact has been added.";
							$scope.errorOccurd = false;
							getContacts();
						});
        }, function (err) {
					$scope.notificationMessage = "Error occurred.";
					$scope.errorOccurd = true;
        });
	}

  }]);
