appModule
    .factory('Pedidos', function($resource,$localstorage) {
        return {
            realizarPedido: function (pedidos) {
                return $resource(apiUrl+'/api/Pedidos/RealizarPedido').save(pedidos);
            },
            obtenerPedidos: function () {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                var user = authData.userName;
                return $resource(apiUrl+'/api/Pedidos',{usuario:user},{ 'query': {method:'GET' ,isArray:true,headers: { 'Authorization': data } }}).query();
            },
            obtenerPedidoPorPedidoId: function (id) {
                return $resource(apiUrl+'/api/Comentarios/'+id).get();
            }

        }
    })