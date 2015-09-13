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
            },
            getPedidosPorProductor: function() {
            debugger;
            var todosLosProductos = $localstorage.getObject('Pedido');
            var pedidos = null;
            for(var i =0; i < todosLosProductos.length;i++){
                var producto = todosLosProductos[i];
                if((pedidos == null || !(pedidos.length > 0)))
                {
                    pedidos = [[producto]];
                }else{
                    for(var j=0;j<pedidos.length;j++)
                    {
                        if(producto.nombreProductor == pedidos[j][0].nombreProductor ){
                            pedidos[j].push(producto)
                        }else{
                            pedidos.push([producto])
                            j++;
                        }
                    }
                }

            }
            return pedidos;
        }

        }
    })