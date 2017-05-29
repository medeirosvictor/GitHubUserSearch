var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider){

  var searchState = {
    name:'search',
    url:'/search',
    templateUrl:'modules/search/index.html'
  };

  var userState = {
    name:'user',
    url:'/user/{userID}',
    controller: 'userController',
    templateUrl:'modules/user/index.html'
  };
  $stateProvider.state(searchState);
  
});
