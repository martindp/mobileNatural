appModule
    .factory('Pedidos', function($resource) {
        return {
            realizarPedido: function (pedidos) {
                return $resource(apiUrl+'/api/Pedidos/RealizarPedido').save(pedidos);
            },
            obtenerPedidos: function () {
                return $resource(apiUrl+'/api/Pedidos').query();
            },
            obtenerPedidoPorPedidoId: function (id) {
                return $resource(apiUrl+'/api/Comentarios/'+id).get();
            }

        }
    })