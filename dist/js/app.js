(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      priority: $scope.selectedItem,
      expired: false
    });

    $scope.newTask.description = '';
  };

// our new expired function
var expireTasks= function() {
var today = new Date(),
    now = today.getTime();

// if more than 5 seconds old, expire it
$scope.tasks.forEach(function(task){
  var createdDate = task.created,
  createdTime = createdDate.getTime();
  console.log(now - createdTime);
  // if task was created more than five seconds ago.. ( we can change this time later )
  if ((now - createdTime) >= 5000){
    task.expired = true;
  }
});
};

// And we call our function like..
 $interval(expireTasks, 10000);

}]);

},{}]},{},[1]);