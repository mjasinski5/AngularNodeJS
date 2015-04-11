app.controller('addScheduledPhone', ['$scope', '$filter', 'contact', '$modal', 'schedule', function ($scope, $filter, contact, $modal, schedule) {

$scope.message = '';
$scope.submitModel =
{
    name: '',
    contacts: [],
    date: '',
    hour: ''
};

var resetForm = function(){
  $scope.submitModel.name = '';
  $scope.submitModel.contacts = [];
  $scope.submitModel.date = '';
  $scope.submitModel.hour = '';
}
$scope.deleteSelectedUser = function(model){
  var index = $scope.submitModel.contacts.indexOf(model);
  if (index > -1) {
    $scope.submitModel.contacts.splice(index, 1);
  }
}
$scope.addScheduledPhone = function(){
  schedule.AddScheduledItem($scope.submitModel).then(function(){
    $scope.savedSuccessfully = true;
    $scope.message = 'A phone call has been scheduled!';
    resetForm();
  }, function(err){
    $scope.savedSuccessfully = false;
    $scope.message = "Error!";
    resetForm();
  })
}
$scope.showContactSearcher = function() {

  contact.GetContacts().then(function(results){
    $scope.data = results.data;
    var modalInstance = $modal.open({
            templateUrl: 'views/modals/contactSearcher.html',
            controller: 'contactSearcher',
            size: 'lg',
            resolve: {
              items: function(){
                return $scope.data;
              }
           }
        });

        modalInstance.result.then(function (contacts) {
            $scope.submitModel.contacts = contacts;
        }, function (err) {
          $scope.notificationMessage = "Error occurred.";
          $scope.errorOccurd = true;
        });
  })

}
$scope.ok = function(){
  $modalInstance.close($scope.submitModel);
}

$scope.cancel = function(){
  $modalInstance.dismiss('cancel');
}

}])
