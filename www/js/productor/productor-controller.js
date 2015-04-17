appModule
    .controller('ProductoresCtrl', function($scope, Productores) {
        $scope.productores = Productores.obtenerProductores();
    })

    .controller('ProductorCtrl', function($scope, $stateParams, Productores) {
        $scope.productor = Productores.obtenerProductorPorId($stateParams.productorId)
    })