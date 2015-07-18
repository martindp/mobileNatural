appModule
    .controller('PedidosCtrl', function($scope, Pedidos, $resource, $location, $localstorage,$ionicHistory) {
        $scope.pedidos = Pedidos.obtenerPedidos();

        $scope.pedidoEntregado = function (index){
            debugger;
            var id = $scope.pedidos[index].Id;
            var authData = $localstorage.getObject('authorizationData');
            var data = "Bearer "+authData.token;
            $resource(apiUrl+'/api/EditarPedido',{pedidoId:id},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query(function(){
                $location.path("app/categorias");
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
            });

        }
        $scope.repetirPedido = function (index){
            var authData = $localstorage.getObject('authorizationData');
            var data = "Bearer "+authData.token;
            var id = $scope.pedidos[index].Id;
            $resource(apiUrl+'/api/RepetirPedido',{pedidoId:id},{ 'query': {method:'POST' ,headers: { 'Authorization': data } }}).query(function(){
                $location.path("app/categorias");
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
            });
        }
    })
    .controller('ComentariosCtrl',function($scope, Pedidos,$location, $resource, $stateParams, $localstorage,$http){
        var authData = $localstorage.getObject('authorizationData');
        var data = "Bearer "+authData.token;
        $scope.pedido = Pedidos.obtenerPedidoPorPedidoId($stateParams.pedidoId);

        $scope.comentarPedido = function (pedidoId, productoId, descripcionComentario, calificacion) {
            debugger;
            $http({ method: 'POST', isArray: false,headers: { 'Authorization': data}, url: 'http://localhost:51297/api/Comentarios/PostComentario', params: { PedidoId: pedidoId, ProductoId:productoId, descripcionComentario: descripcionComentario, calificacion: calificacion } }).then(
                function () {
                    //$scope.pedidoProducto = { Calificacion: 0 };
                    //$scope.pedidoProducto = { Comentario: '' };
                    //Actualizo
                    $scope.pedido = Pedidos.obtenerPedidoPorPedidoId($stateParams.pedidoId);
                });
        };

        })
    .controller('PedidoCtrl', function($scope, $location, $resource, $localstorage,$http,$ionicHistory) {
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
            var authData = $localstorage.getObject('authorizationData');
            var data = "Bearer "+authData.token;
            var pedidosRealizados = $scope.pedidos;
            $http({ method: 'POST', isArray: false,headers: { 'Authorization': data,'contentType': "application/json" }, url: apiUrl+'/api/Pedidos/RealizarPedido', params: { pedidoSimple:JSON.stringify(pedidosRealizados) } }).then(
                function () {
                    $localstorage.setObject('Pedido', []);
                    $("#totalPedidos").html(0);
                    $location.path("app/categorias");
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                });
        }
    })