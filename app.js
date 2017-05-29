var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider){

  var searchState = {
    name:'search',
    url:'',
    templateUrl:'modules/search/index.html'
  };

  var userState = {
    name:'user',
    url:'/user/{userID}',
    controller: 'userController',
    templateUrl:'modules/user/index.html'
  };
  
  $stateProvider.state(searchState);  
  $stateProvider.state(userState);
   
});
