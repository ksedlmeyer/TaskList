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

taskList.controller('Landing.controller', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {
  var ref = new Firebase("https://vivid-inferno-1199.firebaseio.com/");

  $scope.tasks = $firebaseArray(ref);

  $scope.newTask = { description: '', priority: '' };

  $scope.addTask = function() {
    $scope.tasks.$add({
      description: $scope.newTask.description
    });
  };
}]);


<!-- tasklist.controller('Form.controller', ['$scope', function($scope) {
    var Task = 'Wash dog';
    $scope.newTask = {
      description: function(newDescription) {
        if (angular.isDefined(newDescription)) {
          Task = newDescription;
        }
        return Task;
      }
    };
  }]);
  -->
