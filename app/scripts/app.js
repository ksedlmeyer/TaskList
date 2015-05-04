var taskList = angular.module('taskList', ['ui.router', 'ngTouch', 'firebase'])

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

  $stateProvider.state('past', {
    url: '/past',
    controller: 'Landing.controller',
    templateUrl: '/templates/past.html'
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
      created: new Date().getTime(),
      priority: $scope.selectedItem,
      completed: false,
      expired: false
    });
    $scope.newTask.description = '';
  };

  $scope.completeTask = function(task) {
    task.completed = true;
    $scope.tasks.$save(task);
  };

// our new expired function
var expireTasks= function() {
  var now = new Date().getTime();

  // if more than 5 seconds old, expire it
  $scope.tasks.forEach(function(task){
    var createdTime = task.created;
    console.log( task.description + " is " +  ( ( now - createdTime ) / 1000 ) + " seconds old!" );
    // if task was created more than seven days ago..
    if ((now - createdTime) >= 604800000 && !task.expired){
      task.expired = true;
      $scope.tasks.$save(task);
      console.log(task.description + ' is expired.'); // see the task that was just expired in the console
    }
  });
};

// And we call our function like..
 $interval(expireTasks, 10000);

}]);
