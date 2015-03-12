var taskList = angular.module("taskList", ["ui.router", "firebase"];)

taskList.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });
}]);

taskList.controller('Landing.controller', ['$scope', '$firebaseObject', function($scope, $firebaseObject) {
  var ref = new Firebase("https://https://vivid-inferno-1199.firebaseio.come/taskList");

  $scope.task = $firebaseArray(ref);
}]);


