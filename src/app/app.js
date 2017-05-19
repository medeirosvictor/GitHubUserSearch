var app = angular.module('app', ['ui.router','ui.mask']);

app.config(function ($stateProvider){

  var searchState = {
    name:'search',
    url:'/',
    templateUrl:'app/modules/search/index.html'
  }

  var userState = {
    name:'user',
    url:'/user/{userID}',
    controller: 'userController',
    templateUrl:'app/modules/user/index.html'
  }
  $stateProvider.state(searchState);
  $stateProvider.state(userState);
});
