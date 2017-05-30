angular.module("app").controller("userController", userController);

function userController($scope, userFactory){
    init()

    function init(){
        $scope.found = userFactory.getCurrentUser();
    }
}