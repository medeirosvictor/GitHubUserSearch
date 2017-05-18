var app = angular.module('app', ['ui.router','ui.mask']);

app.config(function ($stateProvider){
  var usersState = {
    name:'users',
    url:'/users',
    templateUrl:'app/modules/users/index.html'
  }
  var repositoriesState = {
    name:'repositories',
    url:'repositories',
    templateUrl:'modules/repositories/index.html'
  }
  $stateProvider.state(usersState);
});
