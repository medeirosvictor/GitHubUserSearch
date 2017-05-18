app.controller("userController", userController);

function userController($scope, $http){   
    
    $scope.searchUser = function() {
        $http({
            method: 'GET',
            url: 'https://api.github.com/users/'+$scope.user
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