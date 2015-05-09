appModule
    .controller('PedidosCtrl', function($scope, Pedidos, $resource, $location) {
        $scope.pedidos = Pedidos.obtenerPedidos();

        $scope.pedidoEntregado = function (index){
            var pedidoId = $scope.pedidos[index].Id;
            $resource('http://localhost:51297/api/EditarPedido?pedidoId='+pedidoId).get(function(){
                $location.path("/categorias");
            });

        }
        $scope.repetirPedido = function (index){
            var pedidoId = $scope.pedidos[index].Id;
            $resource('http://localhost:51297/api/RepetirPedido?pedidoId='+pedidoId).save(function(){
                $location.path("/categorias");
            });
        }
    })
    .controller('ComentariosCtrl',function($scope, Pedidos,$location, $resource, $stateParams, $localstorage,$http){
        $scope.pedido = Pedidos.obtenerPedidoPorPedidoId($stateParams.pedidoId);

        $scope.comentarPedido = function (pedidoId, productoId, descripcionComentario, calificacion) {
            $http({ method: 'POST', isArray: false, url: 'http://localhost:51297/api/Comentarios/PostComentario', params: { PedidoId: pedidoId, ProductoId:productoId, descripcionComentario: descripcionComentario, calificacion: calificacion } }).then(
                function () {
                    //$scope.pedidoProducto = { Calificacion: 0 };
                    //$scope.pedidoProducto = { Comentario: '' };
                    //Actualizo
                    $scope.pedido = Pedidos.obtenerPedidoPorPedidoId($stateParams.pedidoId);
                });
        };

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
                $localstorage.setObject('Pedido', []);
                $location.path("/categorias");
            });
        }
    })