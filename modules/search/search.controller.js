angular.module('app').controller("searchController", userController);

function userController($scope, $http){   
    $scope.user={}
    $scope.searchUser = function() {
        $scope.user = $scope.username;
        $http({
            method: 'GET',
            url: 'https://api.github.com/search/users?q='+$scope.username+'+in:fullname+repos:%3E4+location:'+$scope.location
        }).then( 
            function success(response){
                console.log(response.data);
                $scope.userFound = response.data;
                $scope.userFoundStatus = response.status;
          },
            function error(){
                console.log('error on the user request!');
            }
        );
    }
}