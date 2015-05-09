appModule
    .factory('Pedidos', function($resource) {
        return {
            realizarPedido: function (pedidos) {
                return $resource('http://localhost:51297/api/Pedidos/RealizarPedido').save(pedidos);
            },
            obtenerPedidos: function () {
                return $resource('http://localhost:51297/api/Pedidos').query();
            },
            obtenerPedidoPorPedidoId: function (id) {
                return $resource('http://localhost:51297/api/Comentarios/'+id).get();
            }

        }
    })