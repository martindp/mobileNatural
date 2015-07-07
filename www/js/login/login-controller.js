appModule
    .controller('loginController', ['$scope', '$ionicHistory','$state', 'authService', function ($scope, $ionicHistory,$state, authService) {

    $scope.loginData = {
        userName: "",
        password: ""
    };

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.categorias');


            },
            function (err) {
                $scope.message = err.error_description;
            });
    };

}]);