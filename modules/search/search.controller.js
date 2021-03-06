angular.module('app').controller("searchController", userController);

function userController($scope, $http, userFactory) {
    $scope.user={};
    $scope.user = $scope.username;
    $scope.setData = function (user) {
        userFactory.setCurrentUser(user);
    }
    
    $scope.searchUser = function() {
        $scope.user = $scope.username;
        $scope.status = '';
        
        var urlMain = 'https://api.github.com/search/users?q=';
        var urlPartialLocation = '+in:fullname+repos:%3E4+location:';
        if(!!$scope.username == false){
            $scope.status = "Please enter a valid name!";
            return false;
        }
        if (!!$scope.location == false){
            var url = urlMain + $scope.username;
        }
        
        else {
            var url = urlMain + $scope.username + urlPartialLocation + $scope.location;
        }            
            $http({
                method: 'GET',
                url: url
            }).then( 
                function success(response){
                    console.log(response.data);
                    $scope.userFound = response.data;
                    if($scope.userFound.items.length == 0) {
                        $scope.status = "No users were found!";
                        console.log($scope.status);
                    }else {
                        $scope.status = $scope.userFound.total_count+" users found / " +
                        +$scope.userFound.items.length+ " users displayed";
                    }
                
            },
                function error(){
                    console.log('error on the user request!');
                }
            );
        }   
}
