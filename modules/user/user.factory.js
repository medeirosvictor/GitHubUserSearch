angular.module("app").factory('userFactory', userFactory);

function userFactory(){
    var currentUser = {};
    
    function setCurrentUser (data){
        currentUser = data;
    }
    function getCurrentUser (){
        return currentUser;
    }

    return {
        setCurrentUser: setCurrentUser,
        getCurrentUser: getCurrentUser
    }

}