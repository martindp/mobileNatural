appModule
    .factory('Pedidos', function($resource,$localstorage) {
        return {
            realizarPedido: function (pedidosRealizado) {
                debugger;
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                var user = authData.userName;
                return $resource(apiUrl+'/api/Pedidos/RealizarPedido',{pedidos:pedidosRealizado},{ 'query': {method:'POST' ,headers: { 'Authorization': data } }}).query();
                //return $resource(apiUrl+'/api/Pedidos/RealizarPedido').save(pedidos);
            },
            obtenerPedidos: function () {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                var user = authData.userName;
                return $resource(apiUrl+'/api/Pedidos',{usuario:user},{ 'query': {method:'GET' ,isArray:true,headers: { 'Authorization': data } }}).query();
                //return $resource(apiUrl+'/api/Pedidos').query();
            },
            obtenerPedidoPorPedidoId: function (idPedido) {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Pedidos',{id:idPedido},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query();

                //return $resource(apiUrl+'/api/Comentarios/'+id).get();
            }

        }
    })