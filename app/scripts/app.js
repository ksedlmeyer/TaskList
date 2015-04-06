var taskList = angular.module('taskList', ['ui.router', 'firebase'])

.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider.state('landing', {
    url: '/',
    controller: 'Landing.controller',
    templateUrl: '/templates/landing.html'
  });
}]);

taskList.controller('Landing.controller', ['$scope', '$firebaseArray', '$interval', function($scope, $firebaseArray, $interval) {
  var ref = new Firebase("https://vivid-inferno-1199.firebaseio.com/");
  $scope.selectedItem = '';
  $scope.tasks = $firebaseArray(ref);

  $scope.priorities = [{name:'Low'}, {name:'Medium'}, {name:'High'}];
  $scope.newTask = { description: '', priority: '' };
  

  $scope.addTask = function() {
    $scope.tasks.$add({
      description: $scope.newTask.description,
      created: new Date(),
      priority: $scope.selectedItem
    });

    $scope.newTask.description = '';
  };

/*

  $interval(expire, 10000);

  function expire(){
    if (newTask.created > 10000){
      tasks.remove();
    };
  };


*/
}]);
