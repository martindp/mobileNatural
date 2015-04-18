appModule
    .controller('PedidoCtrl', function($scope, Pedidos, $localstorage) {
        $scope.pedidos = $localstorage.getObject('Pedido');
    })