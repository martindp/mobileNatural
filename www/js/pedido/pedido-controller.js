appModule
    .controller('PedidosCtrl', function($scope, Pedidos) {
        $scope.pedidos = Pedidos.obtenerPedidos();
    })
    .controller('PedidoCtrl', function($scope, $location, $resource, $localstorage) {
        $scope.pedidos = $localstorage.getObject('Pedido');
        $scope.eliminarPedido = function(index){
            $scope.pedidos.splice(index, 1);
            $localstorage.setObject('Pedido', $scope.pedidos);

            $("#totalPedidos").html($scope.pedidos.length);
        }
        $scope.agregarUno = function(pedido){
            pedido.cantidadPedido = pedido.cantidadPedido + pedido.cantidad;
            $localstorage.setObject('Pedido', $scope.pedidos);
        }
        $scope.eliminarUno = function(pedido){
            if(pedido.cantidadPedido > 0){
                pedido.cantidadPedido = pedido.cantidadPedido - pedido.cantidad;
            }
            $localstorage.setObject('Pedido', $scope.pedidos);
        }
        $scope.realizarPedido = function (){
            $resource('http://localhost:51297/api/Pedidos/RealizarPedido').save($scope.pedidos, function(){
                $localstorage.setObject('Pedido', null);
                $location.path("/categorias");
            });
        }
    })