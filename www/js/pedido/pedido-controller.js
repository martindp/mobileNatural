appModule
    .controller('PedidosCtrl', function($scope, Pedidos) {
        $scope.pedidos = Pedidos.obtenerPedidos();
    })
    .controller('PedidoCtrl', function($scope, Pedidos, $localstorage) {
        $scope.pedidos = $localstorage.getObject('Pedido');
    })