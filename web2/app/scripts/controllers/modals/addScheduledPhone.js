app.controller('addScheduledPhone', ['$scope', '$modalInstance', '$filter', function ($scope, $modalInstance, $filter) {

$scope.message = '';
$scope.submitModel =
{
  name:'',
  contact: {
    name:'',
    lastname: '',
    nickname: '',
    email: '',
    phoneNumber:'',
  },
  isDone: '',
  priority: ''
};


$scope.ok = function(){
  $modalInstance.close($scope.submitModel);
}

$scope.cancel = function(){
  $modalInstance.dismiss('cancel');
}

}])
