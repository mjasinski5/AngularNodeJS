app.controller('contactSearcher', ['$scope', '$modalInstance', '$filter', 'items', 'ngTableParams', function ($scope, $modalInstance, $filter, items, ngTableParams) {
$scope.data = items;

$scope.message = '';

var returnSelected = function(){
  return $filter('filter')($scope.data, {$selected: true}, true);
}

$scope.tableParams = new ngTableParams({
       page: 1,            // show first page
       count: 10,          // count per page
       filter: {
           //name: 'M'       // initial filter
       },
       sorting: {
           //name: 'asc'     // initial sorting
       }
   }, {
       total: $scope.data.length, // length of data
       getData: function ($defer, params) {
           // use build-in angular filter
           var filteredData = params.filter() ?
                   $filter('filter')($scope.data, params.filter()) :
                   $scope.data;
           var orderedData = params.sorting() ?
                   $filter('orderBy')(filteredData, params.orderBy()) :
                   $scope.data;

           params.total(orderedData.length); // set total for recalc pagination
           $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
       }
   });

$scope.ok = function(){
  $modalInstance.close(returnSelected());
}

$scope.cancel = function(){
  $modalInstance.dismiss('cancel');
}

}])
