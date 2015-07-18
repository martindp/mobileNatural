appModule
    .factory('Pedidos', function($resource,$localstorage) {
        return {
            realizarPedido: function (pedidosRealizado) {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Pedidos/RealizarPedido',{pedidos:pedidosRealizado},{ 'query': {method:'POST' ,headers: { 'Authorization': data } }}).query();
            },
            obtenerPedidos: function () {
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Pedidos',{},{ 'query': {method:'GET' ,isArray:true,headers: { 'Authorization': data } }}).query();
            },
            obtenerPedidoPorPedidoId: function (id) {
                debugger;
                var authData = $localstorage.getObject('authorizationData');
                var data = "Bearer "+authData.token;
                return $resource(apiUrl+'/api/Pedidos',{idPedido:id},{ 'query': {method:'GET' ,headers: { 'Authorization': data } }}).query();
            }

        }
    })