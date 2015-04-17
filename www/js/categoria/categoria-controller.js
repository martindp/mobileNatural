appModule
    .controller('CategoriasCtrl', function($scope, Categorias) {
        $scope.categorias = Categorias.obtenerCategorias();
    })

    .controller('CategoriaCtrl', function($scope, Categorias, $stateParams) {
        $scope.categoria = Categorias.obtenerCategoriaPorId($stateParams.categoriaId);
    })