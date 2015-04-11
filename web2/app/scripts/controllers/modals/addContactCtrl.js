app.controller('addContactCtrl', ['$scope', '$modalInstance', '$filter', function ($scope, $modalInstance, $filter) {

$scope.message = '';
$scope.submitModel =
{
  name:'',
  lastname: '',
  nickname: '',
  email: '',
  phoneNumber: ''
};


$scope.ok = function(){
  $modalInstance.close($scope.submitModel);
}

$scope.cancel = function(){
  $modalInstance.dismiss('cancel');
}

}])
